import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'

Vue.component('LineChart', {
	extends: Line,
	props: ['options'],
	mounted () {
		// @ts-ignore
		this.renderChart(this.chartData, this.options)
	},
})
