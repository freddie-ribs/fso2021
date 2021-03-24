import React, { useState } from "react"

const Button = ({ text, clickHandler }) => {
	return <button onClick={clickHandler}>{text}</button>
}

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<h2>give feedback</h2>
			<Button text="good" clickHandler={() => setGood(good + 1)} />
			<Button text="bad" clickHandler={() => setBad(bad + 1)} />
			<Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
			<h2>statistics</h2>
			<p>good {good}</p>
			<p>bad {bad}</p>
			<p>neutral {neutral}</p>
		</div>
	)
}

export default App
