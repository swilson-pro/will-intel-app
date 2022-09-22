const HomePage = () => {
    return (
        <main>
            <div className="company-aggregates">
                <h3>Company Stats</h3>
                    <h4>Contacts:  {"value"}</h4>
                    <h4>Companies: {"value"}</h4>
                    <h4>Deals: {"value"}</h4>
                    <h4>Products: {"value"}</h4>
            </div>
            <div className="user-aggregates">
                <h3>User Stats</h3>
                    <h4>Contacts: {"value"}</h4>
                    <h4>Companies: {"value"}</h4>
                    <h4>Deals: {"value"}</h4>
                    <h4>Products: {"value"}</h4>
            </div>
        </main>
    )
}

export default HomePage