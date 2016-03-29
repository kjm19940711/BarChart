/** 
 * js获取文本显示宽度 
 * @param str: 文本 
 * @return 文本显示宽度   
 */  
function getTextWidth(str) {  
      var w = $('body').append($('<span stlye="display:none;" id="textWidth"/>')).find('#textWidth').html(str).width();  
      $('#textWidth').remove();  
      return w;  
}  
