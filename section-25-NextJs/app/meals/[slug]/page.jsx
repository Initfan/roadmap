import Image from 'next/image'
import classes from './page.module.css'
import Link from 'next/link'
import { getMeal } from '@/lib/meals'
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const meal = getMeal(params.slug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary,
    }
}

export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.slug);

    meal.instructions = meal.instructions.replace('/\n/g,', '<br />');

    if (!meal) {
        notFound();
    }

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <Link href={`mailto:${meal.creator_email}`}>{meal.creator}</Link>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{ __html: meal.instructions }}
                >
                </p>
            </main>
        </>
    )
}