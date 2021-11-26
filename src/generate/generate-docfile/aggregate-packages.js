
    class Dir {
        constructor(obj){
            this.relative = obj.relative
            this.data = obj
            this.packages = []
            this.folders = []
            this.is_package = obj.is_package
        }
    }

const isPackage = dir => dir.config !== undefined

module.exports = directories => {

    const dir_instances = directories.map(x => new Dir(x))

    const root = dir_instances.find(di => di.relative.length === 0)

    const findAncestors = d => {
        return dir_instances.filter(dk => {
            if(d == dk) return false
            const dpath = d.relative.join('/')
            const dkpath = dk.relative.join('/')
            return dpath.startsWith(dkpath)
        })
    }


    dir_instances.forEach(di => {
        if(di.relative.length === 0) return 
        let ancestors = findAncestors(di)
            .filter(a => a.is_package)
        
        if(ancestors.length === 0){
            if(di.is_package){
                root.packages.push(di)
            } else {
                root.folders.push(di)
            }
        } else {
            // find the deepest ancestor
            let deepest;
            ancestors.forEach(a => {
                if(deepest){
                    if(deepest.relative.length < a.relative.length){
                        deepest = a
                    }
                } else {
                    deepest = a
                }
            })

            if(di.is_package){
                deepest.packages.push(di)
            } else {
                deepest.folders.push(di)
            }
        }

    })

    
    const walkSerialise = d => {
            
        const obj = d.data

        obj.folders = d.folders.map(f => walkSerialise(f))
        obj.packages = d.packages.map(p => walkSerialise(p))

        return obj
    }

    return walkSerialise(root)




}