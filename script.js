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
    let nonTerminals = ['S', 'N', 'V']
    let terminals = ['aku', 'koe', 'kembang', 'lawang', 'layang', 'tuku', 'mangan', 'manuk', 'sego', 'ngombe', 'banyu']

    // parse table definition
    let parseTable = {}

    parseTable[('S, aku')] = ['N', 'V', 'N']
    parseTable[('S, koe')] = ['N', 'V', 'N']
    parseTable[('S, layang')] = ['N', 'V', 'N']
    parseTable[('S, lawang')] = ['N', 'V', 'N']
    parseTable[('S, kembang')] = ['N', 'V', 'N']
    parseTable[('S, manuk')] = ['N', 'V', 'N']
    parseTable[('S, sego')] = ['N', 'V', 'N']
    parseTable[('S, banyu')] = ['N', 'V', 'N']
    parseTable[('S, mangan')] = ['error']
    parseTable[('S, ngombe')] = ['error']
    parseTable[('S, tuku')] = ['error']
    parseTable[('S, EOS')] = ['error']

    parseTable[('N, aku')] = ['aku']
    parseTable[('N, koe')] = ['koe']
    parseTable[('N, layang')] = ['layang']
    parseTable[('N, lawang')] = ['lawang']
    parseTable[('N, kembang')] = ['kembang']
    parseTable[('N, manuk')] = ['manuk']
    parseTable[('N, sego')] = ['sego']
    parseTable[('N, banyu')] = ['banyu']
    parseTable[('N, mangan')] = ['error']
    parseTable[('N, ngombe')] = ['error']
    parseTable[('N, tuku')] = ['error']
    parseTable[('N, EOS')] = ['error']

    parseTable[('V, aku')] = ['error']
    parseTable[('V, koe')] = ['error']
    parseTable[('V, layang')] = ['error']
    parseTable[('V, lawang')] = ['error']
    parseTable[('V, kembang')] = ['error']
    parseTable[('V, manuk')] = ['error']
    parseTable[('V, sego')] = ['error']
    parseTable[('V, banyu')] = ['error']
    parseTable[('V, mangan')] = ['mangan']
    parseTable[('V, ngombe')] = ['ngombe']
    parseTable[('V, tuku')] = ['tuku']
    parseTable[('V, EOS')] = ['error']

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

        setTimeout(() => {
            if (lexicalAnalyzer(input)) {
                if (parser(input)) {
                    parserResult.innerHTML = `<p>\"${input}\" adalah inputan yang VALID</p>`;
                } else {
                    parserResult.innerHTML = `<p>\"${input}\" adalah inputan yang TIDAK VALID</p>`;
                }
            } else {
                lexicalResult.innerHTML = `<p>\"${input}\" adalah inputan yang TIDAK VALID</p>`;
            }
        }, 1500);
    }

    const button = document.querySelector('button');
    button.addEventListener('click', onSubmit);
});
