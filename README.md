# Docotron

Mindlab's answer to there being no consistent and useful method for consolidating repository documentation.

## What is it?

It's a command line application that will allow uniform documenting of different entities from different languages.

## Eh?

Basically it uses file comments in R, Python and Javascript in addition to markdown files and special `.docotron.json` files to compile a common representation that we can use to structure our documentation. A key feature is that we can combine documentation across multiple repositories into a single webpage.

## How?

`docotron` is a node command line tool. Typical usage would be as follow

```
npm install -g docotron

docotron generate ./my_project ./docs/my_project
docotron generate ./other_project ./docs/other_project
```

At this point the folder `/docs` will have a rather abstract representation of the code documentation from two projects. Now we can compile all of this into a nice webpage

```
docotron build ./docs
```

## Amazing!!! How did you do that?

Actually, it's not that clever. In fact `docotron` is spectaularly stupid. Most documentation tools available actually care about the code that is being documented whereas `docotron` does not. I.e, you can easily generate documentation that has absolutely no relationship with the the underlying codebase. It's your job to make sure the documentation is accurate. However, if you think about it that is also the case with other documenting tools, it's just that in `docotron`'s case it does not even check function arguments or even functions that have been documented exist.


## Give me the deets

### Different types of entities in `docotron` 

`docotron` is pretty opinionated. The documentation is made up of the following heirarchy

- __Repositories__: a collection of the following:
    - __Pages__: Markdown documents that describe the repository
    - __Packages__: A repository can be heirarchicaly structured in terms of these. For example packages can have sub packages etc.
        - __Classes__: What is says on the tin.
        - __functions__: again obvs
    - __ContainerSettings__: If the repository is a microservice then we can use this type of documentation to show how the container can be configured.
    - __ApiRoutes__: Again if we have a microservice then it's important to be able to know how to use it via http.

The markdown generated by `docotron` has the following capabilities

- Latex rendering so you can get real nerdy with the maths.
- Syntax highlighting

> Note: that markdown __Pages__ can be added at any level of the heirarchy.

### Specifying structure

The structure of a repository can be inferred. However we can override this by using a `.docotron.json` file. Whenever such a file is encountered in a folder it corresponds to introducing a new level into the documentation heirarchy. 

> See, I told you it was opinionated. Basically `docotron` requires that your code is logically separated and heirarchically organised.

Whenever `docotron` scans a project folder and encounters a `.docotron.json` file it will add this to the parent. When the documents are generated this results in a new sub page.

`.docotron.json` files look like the below.

~~~json
{
    "title": "MySubPackage",
    "items": [
        {
            "type": "header",
            "title": "Classes"
        },
        {
            "type": "page",
            "title": "MyClass",
            "page_type": "function",
            "src": "<unique_id_that_points_to_function_documentation>"
        },
        {
            "type": "docotron",
            "title": "A subpackage",
            "src": "<pointer_to_the_docotron_file>"
        }
    ]    
}
~~~

You can see that this basically reflects a menu structure in the documentation. As intimated above the different `page` types are `markdown`, `function`, `class`, `container-settings` and `web-api`.

### Creating documentation

So the case of using markdown is obvious. You just use the `.docotron.json` file to point to where it is in the codebase.

To document within code you use comment blocks that start with !docotron

I.e,

In javascript:
~~~js
/*
    !docotron
    ...<stuff_here>
*/
~~~

In R and python:

~~~r
# !docotron
# ...<stuff here>
#
~~~