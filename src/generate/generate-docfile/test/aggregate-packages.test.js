const { expect } = require('chai')
const aggregatePackages = require('../aggregate-packages')

describe('generate-docfile/aggregate-packages', () => {

    const directories = [
        {   relative: [], is_package: true },
            {   relative: [ 'fa' ], is_package: false },
            {   relative: [ 'fb' ], is_package: false },
            {   relative: [ 'fa', 'p1' ], is_package: true },
                {   relative: [ 'fa', 'p1', 'fx' ], is_package: false },
                {   relative: [ 'fa', 'p1', 'p11'], is_package: true },
                {   relative: [ 'fa', 'p1', 'p11','fy'], is_package: false },
            {   relative: [ 'p2' ], is_package: true }
    ]

    it('should roll up', () => {

        const root = aggregatePackages(directories) 

        expect(root.is_package).to.be.true
        expect(root.relative).to.eql([])
        expect(root.folders).to.have.lengthOf(2)
        expect(root.folders[0].relative).to.eql(['fa'])
        expect(root.folders[1].relative).to.eql(['fb'])

        expect(root.packages).to.have.lengthOf(2)
        expect(root.packages[0].relative).to.eql(['fa','p1'])
        expect(root.packages[1].relative).to.eql(['p2'])
        
        const p1 = root.packages[0]
        expect(p1.folders).to.have.lengthOf(1)
        expect(p1.folders[0].relative).to.eql(['fa','p1','fx'])
        expect(p1.packages).to.have.lengthOf(1)
        expect(p1.packages[0].relative).to.eql(['fa','p1','p11'])

        const p11 = p1.packages[0]
        expect(p11.packages).to.have.lengthOf(0)
        expect(p11.folders).to.have.lengthOf(1)
        expect(p11.folders[0].relative).to.eql(['fa','p1','p11','fy'])

    })
})