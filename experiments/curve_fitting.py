import numpy as np
import pandas as pd
import plotly.graph_objs as go
from lmfit import Parameters, Minimizer

# Define the exponential sum model


def exp_sum_model(params, x, data=None):
    A1 = params['A1']
    t1 = params['t1']
    A2 = params['A2']
    t2 = params['t2']
    A3 = params['A3']
    model = A1 * np.exp(-x / t1) + A2 * np.exp(-x / t2) + A3
    if data is None:
        return model
    else:
        return model - data


def fit_interval(data, initial_guess):
    # Create Parameters object
    params = Parameters()
    params.add('A1', value=initial_guess[0])
    params.add('t1', value=initial_guess[1])
    params.add('A2', value=initial_guess[2])
    params.add('t2', value=initial_guess[3])
    params.add('A3', value=initial_guess[4])

    # Perform the fit using lmfit
    minner = Minimizer(exp_sum_model, params, fcn_args=(data['x'], data['y']))
    result = minner.minimize()
    return result.params


def curve_fitting(data):
    # Extract columns
    t_data = data['id']
    x_data = data['relative time']
    y_data = data['reading']
    r_data = data['reading no']
    num_intervals = t_data.max()
    g = r_data.max()

    # Pre-process data: compute initial guesses for each interval
    initial_guesses = []
    for i in range(num_intervals):
        k = t_data.count(i)
        for j in range(g):
            if t_data[j] == i:
                interval_start = j
                break
        interval_end = interval_start + k
        interval_data = data[(x_data >= interval_start)
                             & (x_data < interval_end)]
        x_initial = interval_data['Smu1_Time(1)(1)'][:10].values
        y_initial = interval_data['Smu1_I(1)(1)'][:10].values
        A1_initial_guess = y_initial.max()
        t1_initial_guess = x_initial.mean()
        A2_initial_guess = y_initial.min()
        t2_initial_guess = x_initial.mean()
        A3_initial_guess = y_initial.mean()
        initial_guesses.append((A1_initial_guess, t1_initial_guess,
                               A2_initial_guess, t2_initial_guess, A3_initial_guess))

    # Fit intervals sequentially
    parameters_list = []
    for i in range(num_intervals):
        k = t_data.count(i)
        for j in range(g):
            if t_data[j] == i:
                interval_start = j
                break
        interval_end = interval_start + k
        interval_data = data[(x_data >= interval_start)
                             & (x_data < interval_end)]
        params = fit_interval(interval_data, initial_guesses[i])
        parameters_list.append(params)

    # Plot original data
    trace_data = go.Scatter(x=x_data, y=y_data, mode='markers',
                            marker=dict(color='red'), name='Data')

    # Initialize list to store Plotly traces for fitted curves
    fitted_curve_traces = []

    # Generate fitted curves for each interval
    for i, parameters in enumerate(parameters_list):
        k = t_data.count(i)
        for j in range(g):
            if t_data[j] == i:
                interval_start = j
                break
        interval_end = interval_start + k
        interval_data = data[(x_data >= interval_start)
                             & (x_data < interval_end)]
        interval_curve_x = np.linspace(interval_start, interval_end, 100)
        interval_curve_y = exp_sum_model(parameters, interval_curve_x)
        # Create Plotly trace for the fitted curve
        fitted_curve_trace = go.Scatter(
            x=interval_curve_x, y=interval_curve_y, mode='lines', name=f'Interval {i+1} Fit')
        fitted_curve_traces.append(fitted_curve_trace)

    # Plotting with Plotly
    layout = go.Layout(title='Current vs Time', xaxis=dict(title='Time'), yaxis=dict(title='Current'),
                       xaxis_type='linear', yaxis_type='linear',  # Set axis type to linear
                       hovermode='closest',  # Show hover closest data point
                       # Set plot background color to transparent
                       plot_bgcolor='rgba(0,0,0,0)',
                       # Set paper background color to transparent
                       paper_bgcolor='rgba(0,0,0,0)'
                       )
    # Convert list of dictionaries into DataFrame
    for params in parameters_list:
        params['t1'] *= -1
        params['t2'] *= -1

    parameters_df = pd.DataFrame(parameters_list)

    fig = go.Figure(data=[trace_data, *fitted_curve_traces], layout=layout)
    fig.show(renderer='browser')

    return parameters_df.to_dict('split')
