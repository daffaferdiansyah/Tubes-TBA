function lexicalAnalyzer(sentence) {
    console.log(`====== Lexical Analyzer Result ======`);
    let inputString = sentence.toLowerCase() + '#'

    let alphabetList = 'abcdefghijklmnopqrstuvwxyz'
    let stateList = [
        'q0', 'q1', 'q2', 'q3', 'q4',
        'q5', 'q6', 'q7', 'q8', 'q9',
        'q10', 'q11', 'q12', 'q13', 'q14',
        'q15', 'q16', 'q17', 'q18', 'q19',
        'q20', 'q21', 'q22', 'q23', 'q24',
        'q25', 'q26', 'q27', 'q28', 'q29',
        'q30', 'q31'
    ]

    let transitionTable = {}

    for (let state of stateList) {
        for (let alphabet of alphabetList) {
            transitionTable[(`${state}, ${alphabet}`)] = 'error'
        }
        transitionTable[(`${state}, #`)] = 'error'
        transitionTable[(`${state}, ' '`)] = 'error'
    }

    //spaces before input string
    transitionTable['q0,  '] = 'q0'

    //aku
    transitionTable[('q0, a')] = 'q1'
    transitionTable[('q1, k')] = 'q8'
    transitionTable[('q8, u')] = 'q31'

    //koe
    transitionTable[('q0, k')] = 'q2'
    transitionTable[('q2, o')] = 'q15'
    transitionTable[('q15, e')] = 'q31'

    //kembang
    transitionTable[('q2, e')] = 'q9'
    transitionTable[('q9, m')] = 'q16'
    transitionTable[('q16, b')] = 'q21'
    transitionTable[('q21, a')] = 'q22'
    transitionTable[('q22, n')] = 'q27'
    transitionTable[('q27, g')] = 'q31'

    //Lawang
    transitionTable[('q0, l')] = 'q3'
    transitionTable[('q3, a')] = 'q10'
    transitionTable[('q10, w')] = 'q17'
    transitionTable[('q17, a')] = 'q22'

    //Layang
    transitionTable[('q10, y')] = 'q18'
    transitionTable[('q18, a')] = 'q22'

    //tuku
    transitionTable[('q0, t')] = 'q4'
    transitionTable[('q4, u')] = 'q11'
    transitionTable[('q11, k')] = 'q23'
    transitionTable[('q23, u')] = 'q31'

    //mangan
    transitionTable[('q0, m')] = 'q5'
    transitionTable[('q5, a')] = 'q12'
    transitionTable[('q12, n')] = 'q19'
    transitionTable[('q19, g')] = 'q24'
    transitionTable[('q24, a')] = 'q28'
    transitionTable[('q28, n')] = 'q31'

    //manuk
    transitionTable[('q19, u')] = 'q25'
    transitionTable[('q25, k')] = 'q31'

    //sego
    transitionTable[('q0, s')] = 'q6'
    transitionTable[('q6, e')] = 'q13'
    transitionTable[('q13, g')] = 'q29'
    transitionTable[('q29, o')] = 'q31'

    //ngombe
    transitionTable[('q0, n')] = 'q7'
    transitionTable[('q7, g')] = 'q14'
    transitionTable[('q14, o')] = 'q20'
    transitionTable[('q20, m')] = 'q26'
    transitionTable[('q26, b')] = 'q30'
    transitionTable[('q30, e')] = 'q31'

    //banyu
    transitionTable[('q0, b')] = 'q32'
    transitionTable[('q32, a')] = 'q33'
    transitionTable[('q33, n')] = 'q34'
    transitionTable[('q34, y')] = 'q35'
    transitionTable[('q35, u')] = 'q31'

    //space
    transitionTable[("q0,  ")] = 'q0'
    transitionTable[("q31,  ")] = 'q0'

    //accept
    transitionTable[('q0, #')] = 'accept'
    transitionTable[('q31, #')] = 'accept'

    // lexical analysis
    let idxChar = 0
    let currentToken = ''
    let state = 'q0'
    while (state != 'accept') {
        let currentChar = inputString[idxChar]
        currentToken += currentChar
        state = transitionTable[(`${state}, ${currentChar}`)]
        if (state == 'q0' || state == 'q31') {
            console.log(`Token ${idxChar}: ${currentToken} is valid`)
            currentToken = ' '
        }
        if (state == 'error') {
            console.log(`Token ${idxChar}: ${currentToken} is invalid!`)
            break
        }
        idxChar += 1
    }

    // conclusion
    if (state == 'accept') {
        console.log(`Input ${sentence} is valid!`)
        return true
    } else {
        console.log(`Input ${sentence} is invalid!`)
        return false
    }
}


function parser(sentence) {
    console.log(`=========== Parser Result ===========`)
    let tokens = sentence.toLowerCase().split(' ')
    tokens.push('EOS')

    // symbol definition
    let nonTerminals = ['S', 'NN', 'VB']
    let terminals = ['aku', 'koe', 'kembang', 'lawang', 'layang', 'tuku', 'mangan', 'manuk', 'sego', 'ngombe', 'banyu']

    // parse table definition
    let parseTable = {}

    parseTable[('S, aku')] = ['NN', 'VB', 'NN']
    parseTable[('S, koe')] = ['NN', 'VB', 'NN']
    parseTable[('S, layang')] = ['NN', 'VB', 'NN']
    parseTable[('S, lawang')] = ['NN', 'VB', 'NN']
    parseTable[('S, kembang')] = ['NN', 'VB', 'NN']
    parseTable[('S, manuk')] = ['NN', 'VB', 'NN']
    parseTable[('S, sego')] = ['NN', 'VB', 'NN']
    parseTable[('S, banyu')] = ['NN', 'VB', 'NN']
    parseTable[('S, mangan')] = ['error']
    parseTable[('S, ngombe')] = ['error']
    parseTable[('S, tuku')] = ['error']
    parseTable[('S, EOS')] = ['error']

    parseTable[('NN, aku')] = ['aku']
    parseTable[('NN, koe')] = ['koe']
    parseTable[('NN, layang')] = ['layang']
    parseTable[('NN, lawang')] = ['lawang']
    parseTable[('NN, kembang')] = ['kembang']
    parseTable[('NN, manuk')] = ['manuk']
    parseTable[('NN, sego')] = ['sego']
    parseTable[('NN, banyu')] = ['banyu']
    parseTable[('NN, mangan')] = ['error']
    parseTable[('NN, ngombe')] = ['error']
    parseTable[('NN, tuku')] = ['error']
    parseTable[('NN, EOS')] = ['error']

    parseTable[('VB, aku')] = ['error']
    parseTable[('VB, koe')] = ['error']
    parseTable[('VB, layang')] = ['error']
    parseTable[('VB, lawang')] = ['error']
    parseTable[('VB, kembang')] = ['error']
    parseTable[('VB, manuk')] = ['error']
    parseTable[('VB, sego')] = ['error']
    parseTable[('VB, banyu')] = ['error']
    parseTable[('VB, mangan')] = ['mangan']
    parseTable[('VB, ngombe')] = ['ngombe']
    parseTable[('VB, tuku')] = ['tuku']
    parseTable[('VB, EOS')] = ['error']

    // stack initialization
    let stack = []
    stack.push('#')
    stack.push('S')

    // input reading initialization
    let idxToken = 0
    let symbol = tokens[idxToken]

    // parsing
    while (stack.length > 0) {
        let top = stack[stack.length - 1]
        console.log(`Top: ${top}`)
        console.log(`Symbol: ${symbol}`)
        if (terminals.includes(top)) {
            console.log(`${top} is a terminal`)
            if (top == symbol) {
                stack.pop()
                idxToken += 1
                symbol = tokens[idxToken]
                if (symbol == 'EOS') {
                    console.log(`Stack: ${stack}`)
                    stack.pop()
                }
            } else {
                console.log('Error')
                break
            }
        } else if (nonTerminals.includes(top)) {
            console.log(`${top} is a non-terminal`)
            if (parseTable[(`${top}, ${symbol}`)] && parseTable[(`${top}, ${symbol}`)][0] != 'error') {
                stack.pop()
                let pushed_symbol = parseTable[(`${top}, ${symbol}`)]
                for (let i = pushed_symbol.length - 1; i >= 0; i--) {
                    stack.push(pushed_symbol[i])
                }
            } else {
                console.log('Error')
                break
            }
        } else {
            console.log('Parsing error')
            break
        }
        console.log(`Stack: ${stack}\n`)
    }

    // conclusion
    if (symbol == 'EOS' && stack.length == 0) {
        console.log(`Input ${sentence} is accepted!`)
        return true
    } else {
        console.log(`Input ${sentence} is rejected! Check your grammar!`)
        return false
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const formInput = document.querySelector('#input');
    const lexicalResult = document.querySelector('#lexical');
    const parserResult = document.querySelector('#parser');
    const details = document.querySelector('#details');

    const onSubmit = async (event) => {
        event.preventDefault();
        const input = formInput.value;
        console.clear()

        lexicalResult.innerHTML = '';
        parserResult.innerHTML = '';
        details.innerHTML = '';

        // Show spinner for 1.5 seconds
        lexicalResult.innerHTML = '<img src="assets/138.gif" alt="loading..." style="width: 35px; height: 35px;">';

        setTimeout(() => {
            if (lexicalAnalyzer(input)) {
                lexicalResult.innerHTML = `<p>\"${input}\" is accepted by lexical analyzer,</p>`;
            } else {
                lexicalResult.innerHTML = `<p>\"${input}\" is rejected by lexical analyzer,</p>`;
            }

            //Show spinner for 1.5 seconds
            parserResult.innerHTML = '<img src="assets/138.gif" alt="loading..." style="width: 35px; height: 35px;">';
            setTimeout(() => {
                if (parser(input)) {
                    parserResult.innerHTML = `<p>...and accepted by the parser.</p>`;
                } else {
                    parserResult.innerHTML = `<p>...and rejected by the parser.</p>`;
                }

                setTimeout(() => {
                    details.innerHTML = `<p>For more details, open your console in DevTools (ctrl+shift+i)</p>`;
                }, 500);
            }, 1500);
        }, 1500);
    }

    const button = document.querySelector('button');
    button.addEventListener('click', onSubmit);
});
