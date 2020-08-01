import { LevelConfig } from "shared/LevelConfig";

export function generateMultiplicationQuiz(num: number, level: number) {
    const quiz: LevelConfig[] = [];
    const rand = new Random();

    for (let i = 1; i <= 12; i++) {
        const correctAnswer = num * i;
        const correctIndex = rand.NextInteger(0, 3);        
        const wrongAnswers = generateWrongAnswers(rand, num, i);

        const answers: string[] = [];
        let nextWrong = 0;
        for (let answerIndex = 0; answerIndex < 4; answerIndex++) {
            if (answerIndex === correctIndex) {
                answers.push(`${correctAnswer}`);
            } else {
                answers.push(`${wrongAnswers[nextWrong++]}`);
            }
        }

        quiz.push({
            index: i - 1,
            name: `Level ${level}-${i}`,
            question: `${num} x ${i}`,
            answers: answers,
            correctIndex: correctIndex,
        });
    }
    return quiz;
}

function generateWrongAnswers(rand: Random, lhs: number, rhs: number): number[] {
    const wrong: number[] = [];
    while (wrong.size() < 3) {
        let wrongAnswer = generateWrongAnswer(rand, lhs, rhs);
        if (!wrong.includes(wrongAnswer)) {
            wrong.push(wrongAnswer);
        }
    }
    return wrong;
}

function generateWrongAnswer(rand: Random, lhs: number, rhs: number): number {
    switch (rand.NextInteger(1, 3)) {
        case 1:
            return randCloseTo(rand, lhs) * rhs;
        case 2:
            return lhs * randCloseTo(rand, rhs);
        case 3:
            return randCloseTo(rand, lhs * rhs);
    }
    throw 'Inconceivable!';
}

/**
 * Returns a random number within maxDiff of the specified number.
 * 
 * It will ensure that the number is positive and not equal to the specified number.
 */
function randCloseTo(rand: Random, num: number, maxDiff: number = 2): number {
    const min = math.max(1, num - maxDiff);
    const max = num + maxDiff - 1;
    let result = rand.NextInteger(min, max);
    if (result === num) {
        result = max + 1;
    }
    return result;
}
