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
    minner = Minimizer(exp_sum_model, params, fcn_args=(data['relative time'], data['reading']))
    result = minner.minimize()
    return result.params

def curve_fitting(data):
    t_data = data['id'].values
    x_data = data['relative time'].values
    y_data = data['reading'].values
    r_data = data['reading no']
    d_data = data['id'].unique()
    num_intervals = t_data.max()
    g = len(t_data)
    # Pre-process data: compute initial guesses for each interval
    initial_guesses = []
    for i in d_data:
        k = data[data['id'] == i]['id'].count()
        interval_start = 0
        for j in range(g):
            if t_data[j]==i:
                interval_start = j
                break
        
        interval_end = interval_start + k
        interval_data = data.iloc[interval_start : interval_end]
        x_initial = interval_data['relative time'][:5].values
        y_initial = interval_data['reading'][:5].values
    
        A1_initial_guess = y_initial.max()
        t1_initial_guess = x_initial.mean()
        A2_initial_guess = y_initial.min()
        t2_initial_guess = x_initial.mean()
        A3_initial_guess = y_initial.mean()
        initial_guesses.append((A1_initial_guess, t1_initial_guess, A2_initial_guess, t2_initial_guess, A3_initial_guess))


    # Fit intervals sequentially
    parameters_list = []
    for i in range(1,num_intervals+1):
        k = np.count_nonzero(t_data == i)
        for j in range(g):
            if t_data[j]==i:
                interval_start = j
                break
        interval_end = interval_start + k
        interval_data = data.iloc[interval_start : interval_end]
        params = fit_interval(interval_data, initial_guesses[i-1])

        parameters_list.append(params)

    # print(parameters_list['t1'])

    # Plot original data
    trace_data = go.Scatter(x=x_data, y=y_data, mode='markers', marker=dict(color='red'), name='Data')

    # Initialize list to store Plotly traces for fitted curves
    fitted_curve_traces = []

    # Generate fitted curves for each interval
    for i, parameters in enumerate(parameters_list):
        k = np.count_nonzero(t_data == i)
        for j in range(g):
            if t_data[j]==i+1:
                interval_start = j
                break
        interval_end = interval_start + k
        interval_data = data.iloc[interval_start : interval_end]
        interval_curve_x = interval_data['relative time'].values  
        interval_curve_y = exp_sum_model(parameters, interval_curve_x)
        
        # Create Plotly trace for the fitted curve
        fitted_curve_trace = go.Scatter(x=interval_curve_x, y=interval_curve_y, mode='lines', name=f'Interval {i+1} Fit')
        fitted_curve_traces.append(fitted_curve_trace)

    layout = go.Layout(
        title='Current vs Time',
        xaxis=dict(
            title='Time',
            titlefont=dict(
                family='Arial, sans-serif',
                size=18,
                color='black'
            ),
            tickfont=dict(
                family='Arial, sans-serif',
                size=14,
                color='black'
            ),
        ),
        yaxis=dict(
            title='Current',
            titlefont=dict(
                family='Arial, sans-serif',
                size=18,
                color='black'
            ),
            tickfont=dict(
                family='Arial, sans-serif',
                size=14,
                color='black'
            ),
        ),
        xaxis_type='linear', 
        yaxis_type='linear', 
        hovermode='closest', 
        plot_bgcolor='rgba(255, 255, 255, 0.9)', 
        paper_bgcolor='rgba(0,0,0,0)'
    )

    parameters_df = pd.DataFrame(parameters_list)

    # Save DataFrame to CSV file
    parameters_df.to_csv('parameters.csv', index=False)

    fig = go.Figure(data=[trace_data,*fitted_curve_traces], layout=layout)
    fig.show(renderer='browser')

    return parameters_df.to_dict('split')
