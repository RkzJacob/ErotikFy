import './agendauser.css'

export const AgendaUser = ()  =>{
    return (
        <section className="agendauser">
            <div className="agendauser__container">
                <div className="agendauser__container-main-title">
                    <h1>Agenda</h1>
                </div>
                <div className="agendauser__container-titles">
                    <div className="agendauser__container-title">
                        <h2>Jueves 23 de febrero</h2>
                    </div>
                    <div className="agendauser__container-title">
                        <h2>Viernes 24 de febrero</h2>
                    </div>
                    <div className="agendauser__container-title">
                        <h2>Sabado 25 de febrero</h2>
                    </div>
                </div>
                <div className="agendauser__container-content">
                    <ul>
                        <li>
                            <h2>12:30</h2>
                            <h2>@xdsgkjsd</h2>
                        </li>
                        <li>
                            <h2>12:30</h2>
                            <h2>@xdsgkjsd</h2>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </section>
    )
}