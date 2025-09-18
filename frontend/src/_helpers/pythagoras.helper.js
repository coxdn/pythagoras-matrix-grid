import moment from 'moment'
import 'moment/locale/ru'

export const pythagoras = {
/*  calibrateNameWidth: function(name) {
      common.initTextWidth()
      for(var i=0; i<name.length; i++) {
        var calibrate = common.setTextWidth(name.substr(0, name.length-i)+'...')
        if(calibrate[1]<35)
        return [name.substr(0, name.length-i), name.substr(0, name.length-i)+'...']
      }
      return ['', '']
  },*/

  composeDigit: function(digit, count) {
      if(count == 0) return "Нет"
      return String(digit).repeat(count)
  },
  
  digitSum: function(n) {
      n = Math.abs(Number(n)) || 0
      return String(n).split('').reduce((a, d) => a + Number(d), 0)
  },
  getFullDate: function(dateString) {
      if(/^\d\./.test(dateString)) dateString = "0" + dateString
      if(/\.\d\./.test(dateString)) dateString = dateString.replace(/^(\d\d\.)(\d\.)/, "$10$2")
      return dateString
  },

  checkDate: function(dateString) {
      if(!dateString) return {error: 'Ошибка данных в dateString'}
      dateString = this.getFullDate(dateString.trim())
      // moment.locale('ru')
      if(!/^\d{1,2}\.\d{1,2}\.\d{4}$/g.test(dateString))
        return {error: 'Введите дату рождения в формате ДД.ММ.ГГГГ'}
      if(!moment(dateString, "DD.MM.YYYY", true).isValid())
        return {error: 'Такой даты не существует. Введите корректную дату.'}
      return {error: false, fullDate: dateString}
  },

  getAge: function(dateString) {
      moment.locale('ru')
      var a = moment(dateString, "DD.MM.YYYY")
      return {
        digits: moment().diff(a, 'year'),
        format: moment().from(moment().subtract(moment().diff(a, 'year'), 'year'), true)
      }
  },

  calculate: function(dateString) {
      const check = this.checkDate(dateString)
      if(check.error) return
      dateString = check.fullDate

      let sum1 = 0
      for(let i in dateString)
      if(dateString[i] != ".")
      sum1 += Number(dateString[i])
      
      // Always compute the digit sums (second and fourth sums),
      // even when the source number is a single digit
      let sum2 = this.digitSum(sum1)

      // Determine the first digit of the day part correctly
      const dayPart = dateString.split(".")[0]
      const firstDayDigitChar = dayPart[0] === "0" ? dayPart[1] : dayPart[0]
      const firstDayDigit = Number(firstDayDigitChar)

      let sum3 = sum1 - 2 * firstDayDigit

      let sum4 = this.digitSum(sum3)
      
      let digits = this.counterDigits(dateString + String(sum1) + String(sum2) + String(sum3) + String(sum4))
      return {
        digits: digits,
        fullDate: dateString,
        intermediate: String(sum1) + "." + String(sum2) + "." + String(sum3) + "." + String(sum4),
        age: this.getAge(dateString)
      }
  },
  
  counterDigits: function(string) {
      const initAcc = Array.from({length: 9})
        .reduce((acc, skip, i) => {
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