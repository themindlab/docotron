const { expect } = require('chai')
const findAnnotations = require('../find-annotations')
const parsers = require('../parse-annotations')

const {
    parseReturn,
    parseParam,
    parseUnknown,
    parseAnnotations
} = parsers

describe('comment-parser/parse-annotations', () => {

    const named_annotations = [
        ['classname', 'parseClass'],
        ['function', 'parseFunction'],
        ['method', 'parseMethod'],
        ['staticmethod','parseStaticMethod']
    ]

    named_annotations.forEach(([annotation, parser]) => {

        describe(parser, () => {

            it('should parse', () => {
                const parserFcn = parsers[parser]
                expect(parserFcn(`${annotation} Some other stuff`)).to.eql({
                    name: annotation,
                    description: 'Some other stuff'
                })
        
            })
    
        })
    
    
    })



    describe('parseParam', () => {

        it('should parse a simple var + description', () => {
            expect(parseParam('x description of x')).to.eql({
                name: 'x',
                description: 'description of x',
                type: undefined
            })
    
        })

        it('should extract a variable type', () => {
            expect(parseParam('{str} x description of x')).to.eql({
                name: 'x',
                description: 'description of x',
                type: 'str'
            })
    
        })

        it('should allow multiple types', () => {
            expect(parseParam('{(str|number)} x description of x')).to.eql({
                name: 'x',
                description: 'description of x',
                type: ['str', 'number']
            })
        })
    })


    describe('parseReturn', () => {

        it('should handle no return types', () => {
            expect(parseReturn('  description  ')).to.eql({
                type: undefined,
                description: 'description'
            })
        })


        it('should handle single return types', () => {
            expect(parseReturn('{str}  description  ')).to.eql({
                type: 'str',
                description: 'description'
            })
        })

        it('should handle multiple return types', () => {
            expect(parseReturn('{(str|object)}  description  ')).to.eql({
                type: ['str','object'],
                description: 'description'
            })
        })
        
    })


    describe('parse unknown', () => {

        it('should just build a simple key value', () => {
            expect(parseUnknown(`superb`)).to.eql({
                description: 'superb'
            })

        })
    })


    describe('parsing annotations', () => {

        it('should parse removing @ symbol', ()=> {
            const text_annotations = findAnnotations(`
                description
                @xa with a description
                @xb with a description
            `)       
            
            const annots  = parseAnnotations(text_annotations.text_entries)
            expect(annots).to.eql([
                ['xa', { description: 'with a description' }],
                ['xb', { description: 'with a description' }]
            ])

        })

    })
})