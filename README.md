# fetch-component

```npm install --save fetch-component```

or 

```yarn add fetch-component```

# example:

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
