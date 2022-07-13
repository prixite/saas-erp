import ReactDOM from "react-dom/client"

function App(props) {
    return (
        <h2>This is the main page after landing</h2>
    )
}

const root = ReactDOM.createRoot(document.getElementById('contianer'))
root.render(<App />)