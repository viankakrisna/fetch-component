# fetch-component

```npm install --save fetch-component```

or 

```yarn add fetch-component```

## usage:

```
import React from 'react'
import Fetch from 'fetch-component'
function Hello () {
  return (
    <div>
      <h1>Hello from React</h1> 
      <Fetch url={'https://api.github.com/user/repos'}>
        {data => <p>{data.message}</p>}
      </Fetch>
    </div>
  )
}

export default Hello
```
I'm using function as child here. https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9

