import { httpService } from "./http.service"
import axios from 'axios'

export const BitcoinServiceAxe = {
    getRate,
    getChartA,
    getChartB
}

//24 HOURS 
const UPDATE_RATE = 60 * 60 * 24 * 1000

async function getRate() {
    try {
        const rate = storageService.loadFromStorage('rateKey')
      
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
        return res.data
    } catch (err) {
        console.log('Couldn\'t get rate:', err)
        throw (err)
    }
}
async function getChartA() {
    try {
        const rate = storageService.loadFromStorage('chartA')
       
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)

        return res.data
    } catch (err) {
        console.log('Couldn\'t get market price:', err)
        throw (err)
    }
}

async function getChartB() {
    try {
        const rate = storageService.loadFromStorage('chartB')
      
        const res = await axios.get(`https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true`)

        return res.data
    } catch (err) {
        console.log('Couldnt get confirmed transactions:', err)
        throw (err)
    }
}

