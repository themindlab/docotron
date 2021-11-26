const findAnnotations = require('../find-annotations')


describe('comment-parser/find-annotations', () => {

    describe('annotation regexp', () => {

        it('should match', () => {

            const comment_body = `
                This is the general description of the function

                it can span multiple lines
                @anything1 this is the body of text
                @anything 2 this is the rest of the body this
                can also span multiple lines
            `

            const annotations = findAnnotations(comment_body)
            // console.log(annotations)

            // TODO: write assertions
        })


    })

    it('should able to find with no description', () => {
        const annotations = findAnnotations(`
            @param1 with a description
            @param2 with a description
        `)

    })

    it('should not fail if there are no annotations', () => {
        const annotations = findAnnotations(`this comment has no annotations`)
        
    })  

})