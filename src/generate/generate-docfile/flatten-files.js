const path = require('path')

module.exports = pre_doc => {

    const walkFlatten = d => {
        
        const flatCodeFiles = (cf, parent_folder) => ({
            ...cf, relative: parent_folder.relative
        })

        let files = d.code_files.map(cf => flatCodeFiles(cf, d))

        d.folders.forEach(dd => {

            files = files.concat(dd.code_files.map(cf => ({
                ...cf, 
                relative: dd.relative, 
                folder: dd.relative.join('/'),
                path: cf.path.toString().replace(/\\/g,'/')
            })))
            
        })

        d.files = files
        d.packages = d.packages.map(walkFlatten)
        d.path = path.join(d.root, ...d.relative).replace(/\\/g,'/')

        delete d.folders
        delete d.code_files
        delete d.root

        d.folder = d.relative.join('/')

        return d
    }

    return walkFlatten(pre_doc)

}