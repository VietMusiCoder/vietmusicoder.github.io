let field = document.createElement('div'); //создаем поле для змейки
document.body.appendChild(field);//добавим в body
field.classList.add('field');//присваиваем класс field

for(let i=1; i<101; i++){ //создаем 100 ячеек в поле 10x10
    let excel = document.createElement('div'); //создаем ячейку
    field.appendChild(excel); //добавляем в field
    excel.classList.add('excel');//присваиваем класс excel
}
let excel = document.getElementsByClassName('excel'); //добавляем координаты для ячеек
let x = 1, y = 10;

for (let i=0; i<excel.length; i++){
    if (x<=10) {
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
    } else {
        x = 1; y--;
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        x++;
    }
}

function generateSnake(){ //задаем начальные координаты змеи
    let posX = Math.round(Math.random() * (10-3)+3);
    let posY = Math.round(Math.random() * (10-1)+1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),//создаем змею из 3 ячеек
document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')]; 

for (let i = 0; i<snakeBody.length; i++) {
snakeBody[i].classList.add('snakeBody') //каждой ячейке присваиваем класс 'snakeBody'
}
snakeBody[0].classList.add('head'); //голову змеи присваваем еще класс head


let mouse;

function createMouse() { //создаем мышь
    function generateMouse(){
        let posX = Math.round(Math.random() * (10-3)+3);
        let posY = Math.round(Math.random() * (10-1)+1);
        return [posX, posY];
    }
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
    
    while(mouse.classList.contains('snakeBody')){ //проверяем чтобы мышь не появлялась в ячейках змеи
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')

    }
    mouse.classList.add('mouse');//присваиваем класс 'mouse'
}
createMouse();

let direction = 'right'; //храним информацию о направлении движения
let step ='false';

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display:block
`;

let score = 0;
input.value = `Ваши очки: ${score}`;
//учим змею двигаться во всех направлениях
function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');//голове убираем класс 'head'
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');//хвосту удаляем класс snakeBody, чтобы не отображался
    snakeBody.pop(); //удаляем последний элемент массива, хвост

    if (direction == 'right'){
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "' + snakeCoordinates[1] + '"]')); //добавляем элемент в начало массива
        } else {
        snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));//если доходим до края, появляемся в другом краю
        }
    } else if (direction == 'left'){
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]')); //добавляем элемент в начало массива
        } else {
        snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));//если доходим до края, появляемся в другом краю
        }
    } else if (direction == 'up'){
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]')); //добавляем элемент в начало массива
        } else {
        snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] + '"][posY = "1"]'));//если доходим до края, появляемся в другом краю
        }
    } else if (direction == 'down'){
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1]-1) + '"]')); //добавляем элемент в начало массива
        } else {
        snakeBody.unshift(document.querySelector('[posX = "'+ snakeCoordinates[0] + '"][posY = "10"]'));//если доходим до края, появляемся в другом краю
        }
    }
    //учим змею есть мышь
    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length-1].getAttribute('posX');
        let b = snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}`;
    }

    if(snakeBody[0].classList.contains('snakeBody')){
        setTimeout(() => {
            alert(`Игра окончена. Ваши очки: ${score}`);
        }, 200);
        
        clearInterval(interval);
        snakeBody[0].style.background = 'url(scream.jpg) center no-repeat';
        snakeBody[0].style.backgroundSize = "cover";

    }

    snakeBody[0].classList.add('head');//новому элементу массива голове добавляем класс head
    for (let i = 0; i<snakeBody.length; i++) { //каждой ячейке змеи добавляем класс snakebody
        snakeBody[i].classList.add('snakeBody') 
    }
    steps = true;
}

let interval = setInterval(move, 300);//повторяем функцию каждые 300

window.addEventListener('keydown', function (e){//добавляем обработчик событии по нажатию клавиши на клавиатуре
    if (steps == true){
        if (e.keyCode == 37 && direction != 'right'){//клавиша left
            direction = 'left';
            steps = false;
        }
        else if (e.keyCode == 38 && direction != 'down'){//клавиша up
            direction = 'up';
            steps = false;
        } 
        else if (e.keyCode == 39 && direction != 'left'){//клавиша right
            direction = 'right';
            steps = false;
        } 
        else if (e.keyCode == 40 && direction != 'up'){//клавиша down
            direction = 'down';
            steps = false;
        }    
    }
    
});