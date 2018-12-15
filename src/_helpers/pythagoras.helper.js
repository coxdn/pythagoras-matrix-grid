import moment from 'moment'
import 'moment/locale/ru'

export const pythagoras = {
  calibrateNameWidth: function(name) {
      common.initTextWidth()
      for(var i=0; i<name.length; i++) {
        var calibrate = common.setTextWidth(name.substr(0, name.length-i)+'...')
        if(calibrate[1]<35)
        return [name.substr(0, name.length-i), name.substr(0, name.length-i)+'...']
      }
      return ['', '']
  },

  composeDigit: function(digit, count) {
      if(count == 0) return "Нет"
      return String(digit).repeat(count)
  },
  
  getFullDate: function(dateString) {
      if(/^\d\./.test(dateString)) dateString = "0" + dateString
      if(/\.\d\./.test(dateString)) dateString = dateString.replace(/^(\d\d\.)(\d\.)/, "$10$2")
      return dateString
  },

  checkDate: function(dateString) {
      if(!dateString) return {error: 'Ошибка данных в dateString'}
      dateString = this.getFullDate(dateString.trim())
      moment.locale('ru')
      if(!/^\d{1,2}\.\d{1,2}\.\d{4}$/g.test(dateString))
        return {error: 'Введите дату рождения в формате ДД.ММ.ГГГГ'}
      if(!moment(dateString, "DD.MM.YYYY").isValid())
        return {error: 'Такой даты не существует. Введите корректную дату.'}
      return {error: false, fullDate: dateString}
  },

  calculate: function(dateString) {
      const check = this.checkDate(dateString)
      if(check.error) return
      dateString = check.fullDate

      let sum1 = 0
      for(let i in dateString)
      if(dateString[i] != ".")
      sum1 += Number(dateString[i])
      
      let sum2 = 0
      if(String(sum1).length == 2)
      sum2 = Number(String(sum1)[0]) + Number(String(sum1)[1])
      
      let sum3 = 0
      if(dateString[0] == "0")
      sum3 = sum1 - 2*dateString[1]
      else
      sum3 = sum1 - 2*dateString[0]
      
      let sum4 = 0
      if(String(sum3).length == 2)
      sum4 = Number(String(sum3)[0]) + Number(String(sum3)[1])
      
      let digits = this.counterDigits(dateString + String(sum1) + String(sum2) + String(sum3) + String(sum4))
      return {digits: digits, fullDate: dateString, intermediate: String(sum1) + "." + String(sum2) + "." + String(sum3) + "." + String(sum4)}
  },
  
  counterDigits: function(string) {
      const initAcc = Array.from({length: 9})
        .reduce((acc, item, i) => {
          acc[i+1] = 0
          return acc
      }, {})
      return string.replace(/[^\d]|0/g, '')
        .split("")
        .reduce((acc, item) => {
          acc[item]++
          return acc
      }, initAcc)

      /*string = string.split(/[^\d]/g).join("");
      let arr = {}
      for(let i=1; i<=9; i++) {
        let count = 0
        for(let j in string)
        if(Number(string[j]) == i)
        count++
        arr[i] = count
      }
      return arr*/
  },

}