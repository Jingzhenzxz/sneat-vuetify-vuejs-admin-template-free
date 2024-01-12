//  hexToRgb 函数用于将十六进制颜色代码转换为 RGB (红绿蓝) 格式。
// 这在处理颜色转换时特别有用，例如在需要根据颜色代码来设置元素样式时
export const hexToRgb = hex => { // hex: 这是一个表示颜色的十六进制字符串。
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  // 这个正则表达式用于检测十六进制颜色代码是否是缩写形式（如 #03F），这种形式实际上是每个颜色通道仅用一个字符表示。
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

  // 这个方法将缩写形式的十六进制颜色代码转换为完整形式。例如，#03F 会被转换为 #0033FF。
  // 这是通过将每个颜色通道的字符重复一次来实现的。
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  // 这个正则表达式用于从可能已经转换为完整形式的十六进制颜色字符串中提取出三个颜色通道（红色、绿色、蓝色）的值。
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  
  // 如果正则表达式匹配成功，函数会将每个颜色通道的十六进制值转换为十进制数（使用 parseInt 函数，并指定基数为 16），
  // 然后以字符串形式返回，格式为 "r,g,b"，其中 r, g, b 分别是红色、绿色和蓝色通道的值。
  // 如果匹配失败（即输入不是有效的十六进制颜色代码），函数返回 null。
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
}
