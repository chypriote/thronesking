import { cloneDeep } from 'lodash-es'
import { ChartOptions, TickOptions } from 'chart.js'
import { Context } from 'chartjs-plugin-datalabels/types/context'
import { Options } from 'chartjs-plugin-datalabels/types/options'

export const defaultOptions = (ticks: TickOptions = { stepSize: 1 }): ChartOptions => {
	return cloneDeep({
		legend: { display: false },
		tooltips: { enabled: false },
		elements: {
			line: { tension: 0, fill: false },
		},
		scales: {
			yAxes: [{
				ticks,
			}],
		},
	})
}

export enum Colors {
	PRIMARY= '#00d1b2',
	LIGHT= '#ebfffc'
}

export const defaultDataLabel = (formatter: ((value: any, context: Context) => any | null)|undefined = undefined): Options => {
	return cloneDeep({
		clip: false,
		backgroundColor: '#22262b',
		borderWidth: 1,
		align: 'start',
		color: '#fff',
		display: (e: any) => e.active,
		formatter,
	})
}
