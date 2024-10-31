// https://editor.p5js.org/ThatsTrue/sketches/3Y2hmBc7v
//if textsize is undefined it will return the current text size
function textHeight(
  text,
  textsize,
  abovesize,
  belowsize,
  customheight,
  maxheight
) {
  if (text == null) return 10;
  var above;
  var below;
  if (textsize != undefined) {
    textSize(textsize);
  }
  if (customheight != undefined) {
    return (textWidth("+") * customheight) / 100;
  } else if (maxheight != undefined) {
    return (textWidth("+") * 90) / 100;
  }

  if (text.includes("@")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("#")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("&")) {
    above = (textWidth("+") * 69) / 100;
    below = (textWidth("+") * 1.5) / 100;
  } else if (text.includes("1")) {
    above = (textWidth("+") * 67) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("é")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("2")) {
    above = (textWidth("+") * 67.75) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes('"')) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -41.5) / 100;
  } else if (text.includes("3")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("'")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -41.5) / 100;
  } else if (text.includes("4")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("(")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 19.5) / 100;
  } else if (text.includes("5")) {
    above = (textWidth("+") * 66.5) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("§")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 20.25) / 100;
  } else if (text.includes("6")) {
    above = (textWidth("+") * 67.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("è")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("7")) {
    above = (textWidth("+") * 66.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("!")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("8")) {
    above = (textWidth("+") * 67.75) / 100;
    below = (textWidth("+") * 1.9) / 100;
  } else if (text.includes("ç")) {
    above = (textWidth("+") * 52) / 100;
    below = (textWidth("+") * 21.65) / 100;
  } else if (text.includes("9")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("à")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("0")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("-")) {
    above = (textWidth("+") * 31.25) / 100;
    below = (textWidth("+") * -22.5) / 100;
  } else if (text.includes("_")) {
    above = (textWidth("+") * -7.25) / 100;
    below = (textWidth("+") * 12) / 100;
  } else if (text.includes(")")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 19.5) / 100;
  } else if (text.includes("°")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * -39) / 100;
  } else if (text.includes("a")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("A")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("z")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Z")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("e")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("E")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("r")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("R")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("t")) {
    above = (textWidth("+") * 64.5) / 100;
    below = (textWidth("+") * 0.75) / 100;
  } else if (text.includes("T")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("y")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 20.5) / 100;
  } else if (text.includes("Y")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("u")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 1.35) / 100;
  } else if (text.includes("U")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("i")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("I")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("o")) {
    above = (textWidth("+") * 52) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("O")) {
    above = (textWidth("+") * 71.25) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("p")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 20) / 100;
  } else if (text.includes("P")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("^")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -28.5) / 100;
  } else if (text.includes("¨")) {
    above = (textWidth("+") * 68) / 100;
    below = (textWidth("+") * -58.25) / 100;
  } else if (text.includes("$")) {
    above = (textWidth("+") * 74.75) / 100;
    below = (textWidth("+") * 11.1) / 100;
  } else if (text.includes("*")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -41.5) / 100;
  } else if (text.includes("q")) {
    above = (textWidth("+") * 51.5) / 100;
    below = (textWidth("+") * 20) / 100;
  } else if (text.includes("Q")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 5.5) / 100;
  } else if (text.includes("s")) {
    above = (textWidth("+") * 51.75) / 100;
    below = (textWidth("+") * 1.9) / 100;
  } else if (text.includes("S")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("d")) {
    above = (textWidth("+") * 69.5) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("D")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("f")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("F")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("g")) {
    above = (textWidth("+") * 51.25) / 100;
    below = (textWidth("+") * 21.25) / 100;
  } else if (text.includes("G")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("h")) {
    above = (textWidth("+") * 69.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("H")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("j")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 20.25) / 100;
  } else if (text.includes("J")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("k")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("K")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("l")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("L")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("m")) {
    above = (textWidth("+") * 51.6) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("M")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ù")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.35) / 100;
  } else if (text.includes("%")) {
    above = (textWidth("+") * 67.25) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("`")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * -57.1) / 100;
  } else if (text.includes("£")) {
    above = (textWidth("+") * 69.1) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("<")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0.8) / 100;
  } else if (text.includes(">")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0.8) / 100;
  } else if (text.includes("w")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("W")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("x")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("X")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("c")) {
    above = (textWidth("+") * 51.9) / 100;
    below = (textWidth("+") * 1.45) / 100;
  } else if (text.includes("C")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("v")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("V")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("b")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 1.5) / 100;
  } else if (text.includes("B")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("n")) {
    above = (textWidth("+") * 51.6) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("N")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes(",")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes("?")) {
    above = (textWidth("+") * 70.1) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes(";")) {
    above = (textWidth("+") * 49.8) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes(".")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes(":")) {
    above = (textWidth("+") * 49.8) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("/")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("=")) {
    above = (textWidth("+") * 38.75) / 100;
    below = (textWidth("+") * -10.5) / 100;
  } else if (text.includes("+")) {
    above = (textWidth("+") * 49.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("•")) {
    above = (textWidth("+") * 45) / 100;
    below = (textWidth("+") * -24.1) / 100;
  } else if (text.includes("Ÿ")) {
    above = (textWidth("+") * 85.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("")) {
    above = (textWidth("+") * 78.25) / 100;
    below = (textWidth("+") * 2.2) / 100;
  } else if (text.includes("´")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * -57.1) / 100;
  } else if (text.includes("ë")) {
    above = (textWidth("+") * 68) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("„")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes("“")) {
    above = (textWidth("+") * 69.85) / 100;
    below = (textWidth("+") * -45.25) / 100;
  } else if (text.includes("”")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -44.75) / 100;
  } else if (text.includes("‘")) {
    above = (textWidth("+") * 69.85) / 100;
    below = (textWidth("+") * -45.25) / 100;
  } else if (text.includes("’")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -44.75) / 100;
  } else if (text.includes("{")) {
    above = (textWidth("+") * 70.5) / 100;
    below = (textWidth("+") * 19.65) / 100;
  } else if (text.includes("[")) {
    above = (textWidth("+") * 69.75) / 100;
    below = (textWidth("+") * 18.9) / 100;
  } else if (text.includes("¶")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 17) / 100;
  } else if (text.includes("å")) {
    above = (textWidth("+") * 76.65) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("«")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("»")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("¡")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 18.75) / 100;
  } else if (text.includes("Û")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("Ç")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 21.65) / 100;
  } else if (text.includes("Á")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ø")) {
    above = (textWidth("+") * 52.25) / 100;
    below = (textWidth("+") * 2.2) / 100;
  } else if (text.includes("Ø")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("}")) {
    above = (textWidth("+") * 70.5) / 100;
    below = (textWidth("+") * 19.65) / 100;
  } else if (text.includes("]")) {
    above = (textWidth("+") * 69.75) / 100;
    below = (textWidth("+") * 18.9) / 100;
  } else if (text.includes("—")) {
    above = (textWidth("+") * 30.15) / 100;
    below = (textWidth("+") * -23.25) / 100;
  } else if (text.includes("–")) {
    above = (textWidth("+") * 30.15) / 100;
    below = (textWidth("+") * -23.25) / 100;
  } else if (text.includes("æ")) {
    above = (textWidth("+") * 51.75) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("Æ")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Â")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Å")) {
    above = (textWidth("+") * 91.75) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ê")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("Ê")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("®")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("‚")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes("†")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 15.35) / 100;
  } else if (text.includes("™")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -35) / 100;
  } else if (text.includes("Ú")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("º")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * -38.9) / 100;
  } else if (text.includes("ª")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * -38.9) / 100;
  } else if (text.includes("î")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ï")) {
    above = (textWidth("+") * 68) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("œ")) {
    above = (textWidth("+") * 51.75) / 100;
    below = (textWidth("+") * 1.9) / 100;
  } else if (text.includes("Œ")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.5) / 100;
  } else if (text.includes("π")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0.85) / 100;
  } else if (text.includes("∏")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 14.1) / 100;
  } else if (text.includes("ô")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("Ô")) {
    above = (textWidth("+") * 90.25) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("€")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("¥")) {
    above = (textWidth("+") * 66.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("‡")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 15.4) / 100;
  } else if (text.includes("Ω")) {
    above = (textWidth("+") * 69.9) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ò")) {
    above = (textWidth("+") * 90.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("∑")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 14.1) / 100;
  } else if (text.includes("∂")) {
    above = (textWidth("+") * 71.25) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("∆")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ƒ")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 19.7) / 100;
  } else if (text.includes("·")) {
    above = (textWidth("+") * 39.1) / 100;
    below = (textWidth("+") * -27) / 100;
  } else if (text.includes("ﬁ")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ﬂ")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ì")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Î")) {
    above = (textWidth("+") * 88.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ï")) {
    above = (textWidth("+") * 85.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Í")) {
    above = (textWidth("+") * 88.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("È")) {
    above = (textWidth("+") * 88.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ë")) {
    above = (textWidth("+") * 85.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("¬")) {
    above = (textWidth("+") * 38.75) / 100;
    below = (textWidth("+") * -10.5) / 100;
  } else if (text.includes("|")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("µ")) {
    above = (textWidth("+") * 50.35) / 100;
    below = (textWidth("+") * 19.8) / 100;
  } else if (text.includes("Ó")) {
    above = (textWidth("+") * 90.15) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("Ù")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("‰")) {
    above = (textWidth("+") * 69.85) / 100;
    below = (textWidth("+") * 2.5) / 100;
  } else if (text.includes("≤")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("≥")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("‹")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("›")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("≈")) {
    above = (textWidth("+") * 41.75) / 100;
    below = (textWidth("+") * -7.35) / 100;
  } else if (text.includes("⁄")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("©")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("¢")) {
    above = (textWidth("+") * 60) / 100;
    below = (textWidth("+") * 11.1) / 100;
  } else if (text.includes("◊")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("√")) {
    above = (textWidth("+") * 89.75) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("ß")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 1.35) / 100;
  } else if (text.includes("∫")) {
    above = (textWidth("+") * 73) / 100;
    below = (textWidth("+") * 19.5) / 100;
  } else if (text.includes("~")) {
    above = (textWidth("+") * 34.2) / 100;
    below = (textWidth("+") * -15.05) / 100;
  } else if (text.includes("ı")) {
    above = (textWidth("+") * 50.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("∞")) {
    above = (textWidth("+") * 53.1) / 100;
    below = (textWidth("+") * -16.1) / 100;
  } else if (text.includes("¿")) {
    above = (textWidth("+") * 50.75) / 100;
    below = (textWidth("+") * 19.4) / 100;
  } else if (text.includes("…")) {
    above = (textWidth("+") * 10.4) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("÷")) {
    above = (textWidth("+") * 48.25) / 100;
    below = (textWidth("+") * -1) / 100;
  } else if (text.includes("±")) {
    above = (textWidth("+") * 49.25) / 100;
    below = (textWidth("+") * 0) / 100;
  }
  if (text.includes("@")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("#")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("&")) {
    above = (textWidth("+") * 69) / 100;
    below = (textWidth("+") * 1.5) / 100;
  } else if (text.includes("1")) {
    above = (textWidth("+") * 67) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("é")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("2")) {
    above = (textWidth("+") * 67.75) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes('"')) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -41.5) / 100;
  } else if (text.includes("3")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("'")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -41.5) / 100;
  } else if (text.includes("4")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("(")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 19.5) / 100;
  } else if (text.includes("5")) {
    above = (textWidth("+") * 66.5) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("§")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 20.25) / 100;
  } else if (text.includes("6")) {
    above = (textWidth("+") * 67.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("è")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("7")) {
    above = (textWidth("+") * 66.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("!")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("8")) {
    above = (textWidth("+") * 67.75) / 100;
    below = (textWidth("+") * 1.9) / 100;
  } else if (text.includes("ç")) {
    above = (textWidth("+") * 52) / 100;
    below = (textWidth("+") * 21.65) / 100;
  } else if (text.includes("9")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("à")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("0")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("-")) {
    above = (textWidth("+") * 31.25) / 100;
    below = (textWidth("+") * -22.5) / 100;
  } else if (text.includes("_")) {
    above = (textWidth("+") * -7.25) / 100;
    below = (textWidth("+") * 12) / 100;
  } else if (text.includes(")")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 19.5) / 100;
  } else if (text.includes("°")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * -39) / 100;
  } else if (text.includes("a")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("A")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("z")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Z")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("e")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("E")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("r")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("R")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("t")) {
    above = (textWidth("+") * 64.5) / 100;
    below = (textWidth("+") * 0.75) / 100;
  } else if (text.includes("T")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("y")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 20.5) / 100;
  } else if (text.includes("Y")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("u")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 1.35) / 100;
  } else if (text.includes("U")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("i")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("I")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("o")) {
    above = (textWidth("+") * 52) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("O")) {
    above = (textWidth("+") * 71.25) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("p")) {
    above = (textWidth("+") * 51.65) / 100;
    below = (textWidth("+") * 20) / 100;
  } else if (text.includes("P")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("^")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -28.5) / 100;
  } else if (text.includes("¨")) {
    above = (textWidth("+") * 68) / 100;
    below = (textWidth("+") * -58.25) / 100;
  } else if (text.includes("$")) {
    above = (textWidth("+") * 74.75) / 100;
    below = (textWidth("+") * 11.1) / 100;
  } else if (text.includes("*")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -41.5) / 100;
  } else if (text.includes("q")) {
    above = (textWidth("+") * 51.5) / 100;
    below = (textWidth("+") * 20) / 100;
  } else if (text.includes("Q")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 5.5) / 100;
  } else if (text.includes("s")) {
    above = (textWidth("+") * 51.75) / 100;
    below = (textWidth("+") * 1.9) / 100;
  } else if (text.includes("S")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("d")) {
    above = (textWidth("+") * 69.5) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("D")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("f")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("F")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("g")) {
    above = (textWidth("+") * 51.25) / 100;
    below = (textWidth("+") * 21.25) / 100;
  } else if (text.includes("G")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("h")) {
    above = (textWidth("+") * 69.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("H")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("j")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 20.25) / 100;
  } else if (text.includes("J")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("k")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("K")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("l")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("L")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("m")) {
    above = (textWidth("+") * 51.6) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("M")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ù")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.35) / 100;
  } else if (text.includes("%")) {
    above = (textWidth("+") * 67.25) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("`")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * -57.1) / 100;
  } else if (text.includes("£")) {
    above = (textWidth("+") * 69.1) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("<")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0.8) / 100;
  } else if (text.includes(">")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0.8) / 100;
  } else if (text.includes("w")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("W")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("x")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("X")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("c")) {
    above = (textWidth("+") * 51.9) / 100;
    below = (textWidth("+") * 1.45) / 100;
  } else if (text.includes("C")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("v")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("V")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("b")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 1.5) / 100;
  } else if (text.includes("B")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("n")) {
    above = (textWidth("+") * 51.6) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("N")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes(",")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes("?")) {
    above = (textWidth("+") * 70.1) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes(";")) {
    above = (textWidth("+") * 49.8) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes(".")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes(":")) {
    above = (textWidth("+") * 49.8) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("/")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("=")) {
    above = (textWidth("+") * 38.75) / 100;
    below = (textWidth("+") * -10.5) / 100;
  } else if (text.includes("+")) {
    above = (textWidth("+") * 49.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("•")) {
    above = (textWidth("+") * 45) / 100;
    below = (textWidth("+") * -24.1) / 100;
  } else if (text.includes("Ÿ")) {
    above = (textWidth("+") * 85.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("")) {
    above = (textWidth("+") * 78.25) / 100;
    below = (textWidth("+") * 2.2) / 100;
  } else if (text.includes("´")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * -57.1) / 100;
  } else if (text.includes("ë")) {
    above = (textWidth("+") * 68) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("„")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes("“")) {
    above = (textWidth("+") * 69.85) / 100;
    below = (textWidth("+") * -45.25) / 100;
  } else if (text.includes("”")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -44.75) / 100;
  } else if (text.includes("‘")) {
    above = (textWidth("+") * 69.85) / 100;
    below = (textWidth("+") * -45.25) / 100;
  } else if (text.includes("’")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -44.75) / 100;
  } else if (text.includes("{")) {
    above = (textWidth("+") * 70.5) / 100;
    below = (textWidth("+") * 19.65) / 100;
  } else if (text.includes("[")) {
    above = (textWidth("+") * 69.75) / 100;
    below = (textWidth("+") * 18.9) / 100;
  } else if (text.includes("¶")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 17) / 100;
  } else if (text.includes("å")) {
    above = (textWidth("+") * 76.65) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("«")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("»")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("¡")) {
    above = (textWidth("+") * 50.5) / 100;
    below = (textWidth("+") * 18.75) / 100;
  } else if (text.includes("Û")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("Ç")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 21.65) / 100;
  } else if (text.includes("Á")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ø")) {
    above = (textWidth("+") * 52.25) / 100;
    below = (textWidth("+") * 2.2) / 100;
  } else if (text.includes("Ø")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("}")) {
    above = (textWidth("+") * 70.5) / 100;
    below = (textWidth("+") * 19.65) / 100;
  } else if (text.includes("]")) {
    above = (textWidth("+") * 69.75) / 100;
    below = (textWidth("+") * 18.9) / 100;
  } else if (text.includes("—")) {
    above = (textWidth("+") * 30.15) / 100;
    below = (textWidth("+") * -23.25) / 100;
  } else if (text.includes("–")) {
    above = (textWidth("+") * 30.15) / 100;
    below = (textWidth("+") * -23.25) / 100;
  } else if (text.includes("æ")) {
    above = (textWidth("+") * 51.75) / 100;
    below = (textWidth("+") * 1.65) / 100;
  } else if (text.includes("Æ")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Â")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Å")) {
    above = (textWidth("+") * 91.75) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ê")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("Ê")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("®")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("‚")) {
    above = (textWidth("+") * 10.25) / 100;
    below = (textWidth("+") * 14.25) / 100;
  } else if (text.includes("†")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 15.35) / 100;
  } else if (text.includes("™")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * -35) / 100;
  } else if (text.includes("Ú")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("º")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * -38.9) / 100;
  } else if (text.includes("ª")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * -38.9) / 100;
  } else if (text.includes("î")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ï")) {
    above = (textWidth("+") * 68) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("œ")) {
    above = (textWidth("+") * 51.75) / 100;
    below = (textWidth("+") * 1.9) / 100;
  } else if (text.includes("Œ")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.5) / 100;
  } else if (text.includes("π")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0.85) / 100;
  } else if (text.includes("∏")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 14.1) / 100;
  } else if (text.includes("ô")) {
    above = (textWidth("+") * 70.75) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("Ô")) {
    above = (textWidth("+") * 90.25) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("€")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("¥")) {
    above = (textWidth("+") * 66.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("‡")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 15.4) / 100;
  } else if (text.includes("Ω")) {
    above = (textWidth("+") * 69.9) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ò")) {
    above = (textWidth("+") * 90.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("∑")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 14.1) / 100;
  } else if (text.includes("∂")) {
    above = (textWidth("+") * 71.25) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("∆")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ƒ")) {
    above = (textWidth("+") * 71) / 100;
    below = (textWidth("+") * 19.7) / 100;
  } else if (text.includes("·")) {
    above = (textWidth("+") * 39.1) / 100;
    below = (textWidth("+") * -27) / 100;
  } else if (text.includes("ﬁ")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("ﬂ")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ì")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Î")) {
    above = (textWidth("+") * 88.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ï")) {
    above = (textWidth("+") * 85.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Í")) {
    above = (textWidth("+") * 88.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("È")) {
    above = (textWidth("+") * 88.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("Ë")) {
    above = (textWidth("+") * 85.5) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("¬")) {
    above = (textWidth("+") * 38.75) / 100;
    below = (textWidth("+") * -10.5) / 100;
  } else if (text.includes("|")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("µ")) {
    above = (textWidth("+") * 50.35) / 100;
    below = (textWidth("+") * 19.8) / 100;
  } else if (text.includes("Ó")) {
    above = (textWidth("+") * 90.15) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("Ù")) {
    above = (textWidth("+") * 88.25) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("‰")) {
    above = (textWidth("+") * 69.85) / 100;
    below = (textWidth("+") * 2.5) / 100;
  } else if (text.includes("≤")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("≥")) {
    above = (textWidth("+") * 50.1) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("‹")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("›")) {
    above = (textWidth("+") * 42.6) / 100;
    below = (textWidth("+") * -10) / 100;
  } else if (text.includes("≈")) {
    above = (textWidth("+") * 41.75) / 100;
    below = (textWidth("+") * -7.35) / 100;
  } else if (text.includes("⁄")) {
    above = (textWidth("+") * 67.5) / 100;
    below = (textWidth("+") * 1.75) / 100;
  } else if (text.includes("©")) {
    above = (textWidth("+") * 69.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("¢")) {
    above = (textWidth("+") * 60) / 100;
    below = (textWidth("+") * 11.1) / 100;
  } else if (text.includes("◊")) {
    above = (textWidth("+") * 71.1) / 100;
    below = (textWidth("+") * 2) / 100;
  } else if (text.includes("√")) {
    above = (textWidth("+") * 89.75) / 100;
    below = (textWidth("+") * 1.8) / 100;
  } else if (text.includes("ß")) {
    above = (textWidth("+") * 70.25) / 100;
    below = (textWidth("+") * 1.35) / 100;
  } else if (text.includes("∫")) {
    above = (textWidth("+") * 73) / 100;
    below = (textWidth("+") * 19.5) / 100;
  } else if (text.includes("~")) {
    above = (textWidth("+") * 34.2) / 100;
    below = (textWidth("+") * -15.05) / 100;
  } else if (text.includes("ı")) {
    above = (textWidth("+") * 50.25) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("∞")) {
    above = (textWidth("+") * 53.1) / 100;
    below = (textWidth("+") * -16.1) / 100;
  } else if (text.includes("¿")) {
    above = (textWidth("+") * 50.75) / 100;
    below = (textWidth("+") * 19.4) / 100;
  } else if (text.includes("…")) {
    above = (textWidth("+") * 10.4) / 100;
    below = (textWidth("+") * 0) / 100;
  } else if (text.includes("÷")) {
    above = (textWidth("+") * 48.25) / 100;
    below = (textWidth("+") * -1) / 100;
  } else if (text.includes("±")) {
    above = (textWidth("+") * 49.25) / 100;
    below = (textWidth("+") * 0) / 100;
  }

  if (text != "") {
    if (abovesize != undefined && belowsize != undefined) {
      return above + below;
    } else if (abovesize != undefined) {
      return above;
    } else if (belowsize != undefined) {
      return below;
    } else {
      return above + below;
    }
  } else {
    return 0;
  }
}
