import { IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton } from '@ionic/react';
import style from './page.module.css';
import { PageProps } from '@/utils/types/page';
import { timelineEvents } from './data/json-default';
import Footer from '@/template/footer';
import { IconLiz } from '@/template/icon-liz';



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
            <IonHeader
                collapse="condense"
                className="custom-toolbar-clear h-fit absolute -top-0"
            >
                <IonToolbar>
                    <a className="cursor-pointer" href="/">
                        <IconLiz fill={onScroll ? "#FFF" : "#7927F5"} width={55} />
                    </a>
                </IonToolbar>
            </IonHeader>
            <section className="flex my-4">
                <IonBackButton color={"tertiary"} text={"Regresar"} defaultHref="/" />
            </section>
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