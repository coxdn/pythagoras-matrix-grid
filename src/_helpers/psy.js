export const psy = {
/*  do: function(e, that) {
      if (e.keyCode == 13) {
          let calc = this.calc(that.value)
          this.composeBlock("", '', calc.fullDate, calc.digits, calc.intermediate)
          
          $('div.do-save').click(function () {
            server.doSave($(this).parent().parent().find('.date').html())
            server.savingBlock = $(this).parent().parent()
          })

          $('div.clear-button').click(function () {
            server.clear(this)
          })
      } else {
        clearTimeout(server.searchingTimer)
        server.searchingTimer = setTimeout(function () {
          if(that.value.length<2) return true
          server.doSearch(that.value)
        }, 1000)
      }
  },*/
  
  calibrateNameWidth: function(name) {
      common.initTextWidth()
      for(var i=0; i<name.length; i++) {
        var calibrate = common.setTextWidth(name.substr(0, name.length-i)+'...')
        if(calibrate[1]<35)
        return [name.substr(0, name.length-i), name.substr(0, name.length-i)+'...']
      }
      return ['', '']
  },

/*  recomposeBlock: function(name, tags) {
      if(tags!='')
      $(server.savingBlock).attr('title', tags.trim())
      else
      $(server.savingBlock).removeAttr('title')
      var shortName = this.calibrateNameWidth(name)
      if(shortName[0].length<name.length) {
        $(server.savingBlock).find('.matrix-people-name').html(shortName[1]).attr('title', name)
      } else {
        $(server.savingBlock).find('.matrix-people-name').html(name).removeAttr('title')
      }
  },*/

  composeBlock: function(name, tags, dateString, digits, intermediate) {
      let d = digits
      if($('.ui-state-disabled').length == 0) {
        server.status("Нет свободного поля для расчета матрицы.")
        return false
      }
      let cd = this.composeDigit
      var shortName = this.calibrateNameWidth(name)
      var saveButton = ''
      if(name=="") saveButton = '<div class="do-save">Сохранить</div>'
      var html = '<div class="matrix-people-name"' + (shortName[0].length<name.length ? ' title="'+name.replace('"', '\\"')+'">'+shortName[1] : '>'+name) + saveButton + '</div>'+
        '<div class="intermediate"><div class="inter clear-button" title="Убрать">X</div><div class="inter">' + intermediate + '</div><div class="date">' + dateString + '</div></div>'+
        '<div class="clear"></div>'+
        '<div class="matrix">'+
          '<div>'+cd(1, d[1])+'<br>'+cd(2, d[2])+'<br>'+cd(3, d[3])+'</div>'+
          '<div class="center">'+cd(4, d[4])+'<br>'+cd(5, d[5])+'<br>'+cd(6, d[6])+'</div>'+
          '<div>'+cd(7, d[7])+'<br>'+cd(8, d[8])+'<br>'+cd(9, d[9])+'</div>'+
        '</div>'
      if(tags!='')
      $('.ui-state-disabled:first').attr('title', tags.trim())
      $('.ui-state-disabled:first').html(html).removeClass('ui-state-disabled')
      $('div.clear-button').click(function () {
          server.clear(this)
      })
  },
  
  composeDigit: function(digit, count) {
      if(count == 0) return "Нет"
      return String(digit).repeat(count)
  },
  
  calculate: function(dateString) {
      dateString = dateString.trim()
      if(!/^\d{1,2}\.\d{1,2}\.\d{4}$/g.test(dateString.trim())) {
        return {error: 'Введите дату в формате ДД.ММ.ГГГГ'}
      }
      
      if(/^\d\./.test(dateString)) dateString = "0" + dateString
      if(/\.\d\./.test(dateString)) dateString = dateString.replace(/^(\d\d\.)(\d\.)/, "$10$2")
      
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
      const initAcc = Array.from({length:9})
        .reduce((acc, item, i) => {
          acc[i+1] = 0;
          return acc;
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