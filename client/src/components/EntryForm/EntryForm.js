import React from "react";

const EntryForm = ({
    page,
    submitFunction,
    username,
    password,
    setUsername,
    setPassword,
}) => {
    return (
        <div className="entryForm">
            <form id="entry-form" onSubmit={submitFunction}>
                <div>
                    <input
                        className="roundedInput formInput"
                        id="entry-input-top"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    ></input>
                    <input
                        className="roundedInput formInput"
                        id="entry-input-bottom"
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                </div>
                <button
                    className="primary-button"
                    id="entry-button"
                    type="submit"
                >
                    {page}
                </button>
            </form>
        </div>
    );
};

export default EntryForm;
