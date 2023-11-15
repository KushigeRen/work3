/*液晶に表示する値を格納する変数*/
let input = '';

$(document).ready(function(){
  /*押下した数字を取得し液晶に表示する*/
  $('[id^="input"]').click(function(){
    input += $(this).val();
    displayInputValue();  
  });
  
  /*押下した演算子を取得し液晶に表示する*/
  $('[id^="operator"]').click(function(){
    if(lastCharacter() || input === ''){
      /*処理なし*/
    }else{
      input += $(this).val();
      displayInputValue(); 
    }
  })

  /*押下した小数点を取得し液晶に表示する*/
  $('#point').click(function(){
    if(lastCharacter() || input === '' || index()){
      /*処理なし*/
    }else{
      input += $(this).val();
      displayInputValue(); 
    }
  })
  
  /*左矢印ボタン押下で１文字削除する*/
  $('#delete').click(function(){
    input = input.slice(0,-1);
    displayInputValue();
  });
  
  /*液晶画面に表示されている値を全削除する*/
  $('#clear').click(function(){
    input = '';
    displayInputValue();
  });
  
  /*入力された計算式の結果を液晶に表示する*/
  $('#equal').click(function(){
    if(input === ''){
      /*処理なし*/
    }else{
      let temp = input.replaceAll('÷','/').replaceAll('×','*');
      /*文字列の計算式から結果を取得する*/
      let result = Function('return ('+temp+');')();
      /*再度文字列に変換し変数に格納する*/
      input = String(result);
      displayInputValue(); 
    }
  });
});

/*変数の値を液晶に表示する関数*/
const displayInputValue =()=>{
  $("#display").val(input);
  console.log(input);
};


/*-----↓入力制御用関数-----*/

/*inputの最後の１文字が数字以外であることを検知する関数
数字以外の場合trueを返す*/
const lastCharacter =()=>{
  let flag = false;
  const operators = ['+','-','×','÷','.'];
  if(operators.includes(input.slice(-1))){
      flag = true;
  }
  return flag;
};

/*小数点入力制限関数
inputの中で一番後ろにある小数点と演算子の位置を取得し、
小数点の方が後ろにある場合trueを返す*/
const index =()=>{
  const operators = ['+','-','×','÷'];
  let flag = input.includes('.');
  const pointIndex = input.lastIndexOf('.');
  for(let i = 0;i < operators.length;i++){
    console.log(operators[i]);
    let operatorIndex = input.lastIndexOf(operators[i]);
    if(pointIndex < operatorIndex){
    flag = false;
    }
  }
  return flag;
};