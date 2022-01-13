import './Form.css'

function Form({ handleSubmit, title, children }) {
    return (
        <form className="form-auth text-center" onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal">{title}</h1>
            {children}
            <button className="w-100 btn btn-lg btn-primary custom-button mt-3" type="submit">{title}</button>
        </form>
    )
}

export default Form;