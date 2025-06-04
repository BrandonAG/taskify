function Navigation() {

    const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

   try {
        fetch('http://localhost:3001/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            response.json()
        })
        .then((result) => {
            window.location.href = "/";
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0 text-start">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none ms-2">
                        Taskify
                    </a>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
                    <li><a href="/" className="nav-link px-2">Projects</a></li>
                </ul>
                <div className="col-md-3 text-end">
                    <button onClick={handleFormSubmit} type="button" className="btn btn-outline-primary me-2">Sign out</button>
                </div>
            </header>
        </div>
    </>
  );
}

export default Navigation;