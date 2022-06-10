function lexicalAnalyzer(sentence) {
    console.log(`====== Lexical Analyzer Result ======`);
    let inputString = sentence.toLowerCase() + '#'

    // initializations
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
    transitionTable[('q2, 0')] = 'q15'
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

    //sego
    transitionTable[('q0, s')] = 'q6'
    transitionTable[('q6, e')] = 'q13'
    transitionTable[('q13, g')] = 'q29'
    transitionTable[('q29, o')] = 'q31'

    //banyu
    transitionTable[('q0, b')] = 'q32'
    transitionTable[('q32, a')] = 'q33'
    transitionTable[('q33, n')] = 'q34'
    transitionTable[('q34, y')] = 'q35'
    transitionTable[('q35, u')] = 'q31'

    //space
    transitionTable[('q0,  ')] = 'q0'
    transitionTable[('q31, ')] = 'q0'

    //accept
    transitionTable[('q0, #')] = 'accept'
    transitionTable[('q31, #')] = 'q0'

    // lexical analysis
    let idxToken = 0
    let state = 'q0'
    let currentToken = ''
    for (let idx_char = 0; state != 'accept'; idx_char++) {
        let currentChar = inputString[idx_char]
        currentToken += currentChar
        state = transitionTable[(`${state}, ${currentChar}`)]
        if (state == 'q0' || state == 'q31') {
            idxToken += 1
            console.log(`Token ${idxToken}: ${currentToken} is valid`)
            currentToken = ''
        }
        if (state == 'error') {
            idxToken += 1
            console.log(`Token ${idxToken}: ${currentToken} is invalid!`)
            break
        }
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
