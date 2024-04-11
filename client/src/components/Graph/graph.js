import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import Plot from 'react-plotly.js';
import Header from '../Header/Header';
import './graph.css'
const graph = () => {

  return (
    <>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
      />
    </>

  )
}

export default graph