const { expect } = require("chai")
const findAnnotations = require("../find-annotations")
const { parseAnnotations } = require('../parse-annotations')
const validateAnnotations = require('../validate-annotations')

describe('comment-parser/validate-annotations', () => {


    describe('invalid combinations', () => {

        const cannot_combine = [
            'class', 'function','method','staticmethod' 
        ]


        for(let i=0 ; i < cannot_combine.length ; i++){
            for(let j=0 ; j < cannot_combine.length ; j++){
                const a1 = `@${cannot_combine[i]}`
                const a2 = `@${cannot_combine[j]}`

                it(`should forbid combinations of ${a1} & ${a2}`, () => {
                    const comment = `
                    ${a1} with a description
                    ${a2} with a description
                    `

                    const { text_entries } = findAnnotations(comment)
                    const annotations = parseAnnotations(text_entries)
                    expect(validateAnnotations(annotations)).to.eql({
                        type: 'invalid annotation',
                        reason: 'cannot combine annotations, class, function, method or staticmethod'
                    })
                })
            }    
        }
    })


    describe('parameter names', () => {

        it('paramater names cannot be duplicated', () => {

            const { text_entries } = findAnnotations(`
                @param x this is X
                @param x this is also x
            `)
            const annotations = parseAnnotations(text_entries)

            expect(validateAnnotations(annotations)).to.eql({
                type: 'invalid annotation',
                reason: 'duplicated parameter names: x'
            })
        })
    
    })


    describe('class validation', () => {

        it('classes cannot have params', () => {
            const { text_entries } = findAnnotations(`
                @class Classname
                @param x this is X
            `)
            const annotations = parseAnnotations(text_entries)

            expect(validateAnnotations(annotations)).to.eql({
                type: 'invalid annotation',
                reason: 'class cannot have @param'
            })

        })


        it('classes cannot have return', () => {
            const { text_entries } = findAnnotations(`
                @class Classname
                @whatever x this is X
                @return the return value
            `)
            const annotations = parseAnnotations(text_entries)

            expect(validateAnnotations(annotations)).to.eql({
                type: 'invalid annotation',
                reason: 'class cannot have @return'
            })

        })

    })


    describe('singleton annotations', () => {

        it('multiple return', () => {
            const { text_entries } = findAnnotations(`
                @method Classname
                @whatever x this is X
                @return the return value
                @return another return statement!
            `)

            const annotations = parseAnnotations(text_entries)

            expect(validateAnnotations(annotations)).to.eql({
                type: 'invalid annotation',
                reason: 'cannot have multiple annotations of type: @return'
            })

        })

    })

})