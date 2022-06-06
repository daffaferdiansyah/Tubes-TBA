import string

sentence = input('masukkan sentence: ')
inputString = sentence.lower()+'#'

alphabetList = list(string.ascii_lowercase)
stateList = ['q0', 'q1', 'q2',  'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10',
            'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18', 'q19', 'q20',
            'q21', 'q22', 'q23', 'q24', 'q25', 'q26', 'q27', 'q28', 'q29', 'q30']
        
transitionTable = {}

for state in stateList:
    for alphabet in alphabetList:
        transitionTable[(state, alphabet)] = 'error'
    transitionTable[(state, '#')] = 'error'
    transitionTable[(state, ' ')] = 'error'

transitionTable['q0', ' '] = 'q0'

# aku
transitionTable['q0', 'a'] = 'q1'
transitionTable['q1', 'k'] = 'q8'
transitionTable['q8', 'u'] = 'q31'

# koe
transitionTable['q0', 'k'] = 'q2'
transitionTable['q2', 'o'] = 'q15'
transitionTable['q15', 'e'] = 'q31'

#kembang
transitionTable['q2', 'e'] = 'q9'
transitionTable['q9', 'm'] = 'q16'
transitionTable['q16', 'b'] = 'q21'
transitionTable['q21', 'a'] = 'q22'
transitionTable['q22', 'n'] = 'q27'
transitionTable['q27', 'g'] = 'q31'

# lawang
transitionTable['q0', 'l'] = 'q3'
transitionTable['q3', 'a'] = 'q10'
transitionTable['q10', 'w'] = 'q17'
transitionTable['q17', 'a'] = 'q22'

# layang
transitionTable['q10', 'y'] = 'q18'
transitionTable['q18', 'a'] = 'q22'

# tuku
transitionTable['q0', 't'] = 'q4'
transitionTable['q4', 'u'] = 'q11'
transitionTable['q11', 'k'] = 'q23'
transitionTable['q23', 'u'] = 'q31'

# mangan
transitionTable['q0', 'm'] = 'q5'
transitionTable['q5', 'a'] = 'q12'
transitionTable['q12', 'n'] = 'q19'
transitionTable['q19', 'g'] = 'q24'
transitionTable['q24', 'a'] = 'q28'
transitionTable['q28', 'n'] = 'q31'

# manuk
transitionTable['q19', 'u'] = 'q25'
transitionTable['q25', 'k'] = 'q31'

# sego
transitionTable['q0', 's'] = 'q6'
transitionTable['q6', 'e'] = 'q13'
transitionTable['q13', 'g'] = 'q29'
transitionTable['q29', 'o'] = 'q31'

# ngombe
transitionTable['q0', 'n'] = 'q7'
transitionTable['q7', 'g'] = 'q14'
transitionTable['q14', 'o'] = 'q20'
transitionTable['q20', 'm'] = 'q26'
transitionTable['q26', 'b'] = 'q30'
transitionTable['q30', 'e'] = 'q31'

# accept
transitionTable['q0', '#'] = 'accept'
transitionTable['q31', '#'] = 'accept'

#space
transitionTable['q31', ' '] = 'q0'
transitionTable['q0', ' '] = 'q0'

idxChar = 0
currenToken = ''
state = 'q0'
while state != 'accept':
    currenChar = inputString[idxChar]
    currenToken += currenChar
    state = transitionTable[(state, currenChar)]
    if state == 'q31':
        print('Current token:', currenToken, ', valid')
        currenToken = ' '
    if state == 'error':
        print('Current token:', currenToken, ', Error')
        break
    idxChar += 1

if state == 'accept':
    print('Semua token di input: ', sentence, ', valid')