import HelloWorld from './hello-world'
import BindClass from './bind-class'
import BindHover from './bind-hover'

export { HelloWorld }

export const routes = [
  {
    name: 'Hello world',
    path: '/hello-world',
    component: HelloWorld,
    children: [
      {
        path: 'bind-class',
        name: 'Bind class',
        component: BindClass
      },
      {
        path: 'bind-hover',
        name: 'Bind hover',
        component: BindHover
      }
    ]
  }
]
