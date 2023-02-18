import { useState } from 'react'
import './App.css'
import { Route, RouteComponentProps, DefaultParams } from 'wouter'

const InboxPage = ({}: RouteComponentProps<DefaultParams>) => {
  return <>Inbox</>
};

function App() {
  const [count, setCount] = useState(0)
  return (
      <div>
        <Route path="/cock">
          {
            (params) => {
              return "cock"
            }
          }
        </Route>
        <Route path="/inbox" component={InboxPage} />
      </div>
    );
}

export default App
