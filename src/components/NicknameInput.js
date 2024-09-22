import './NicknameInput.css';

export function NicknameInput({ onChange, minLength, onEnter }) {

  function handleChange(event) {
    onChange(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      onEnter();
    }
  }

  return (
    <div id="nickname-input">
      <input type="text" className="itxt" placeholder="Nickname" maxLength="12" minLength={minLength} onChange={handleChange} onKeyDown={handleKeyPress}></input>
    </div>
  );
}