import { IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import style from './page.module.css';
import { PageProps } from '@/utils/types/page';
import { timelineEvents } from './data/json-default';
import Footer from '@/template/footer';



const HistoriaPage = ({ onScroll }: PageProps) => {
    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <IonHeader collapse="condense" className="custom-toolbar z-50 -top-16">
                <IonToolbar>
                    <IonTitle size="large" className="text-white font-medium tracking-tight">
                        <span className="text-6xl">Liz</span>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <section className={style.timeline}>
                {timelineEvents.map((event) => (
                    <div key={event.id} className={style["timeline-event"]}>
                        <u className={style["timeline-icon"]} style={{ backgroundColor: event.backgroundColor }}>
                            {event.image && (
                                <span className={style.container}>
                                    <img src={event.image} alt={event.title} />
                                </span>
                            )}
                            <event.Icon size={40} />
                        </u>

                        <label className={style["timeline-content"]}>
                            {event.title && (
                                <h3>
                                    {event.year && `${event.year} - `}
                                    {event.title}
                                </h3>
                            )}
                            <p>{event.content}</p>
                        </label>
                    </div>
                ))}
            </section>

            <Footer />
        </IonContent >
    );
}

export default HistoriaPage;