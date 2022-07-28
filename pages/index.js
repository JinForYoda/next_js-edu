import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getPostData, getSortedPostsData } from '../lib/posts'
import Date from '../components/date'

export async function getStaticProps() {
	const allPostsData = getSortedPostsData()
	const aboutMe = await getPostData('introductionMe')
	return {
		props: {
			allPostsData,
			aboutMe,
		},
	}
}

export default function Home({ allPostsData, aboutMe }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<div
					dangerouslySetInnerHTML={{ __html: aboutMe.contentHtml }}
				/>
				<p>
					<a href='https://github.com/JinForYoda' target='_blank'>
						My GitHub
					</a>
				</p>
				<p>
					My projects: <br />
					{'• '}
					<a
						href='https://jinforyoda.github.io/filmopoisk_react/'
						target='_blank'
					>
						Kinopoisk clone
					</a>
					<br />
					{'• '}
					<a
						href='https://jinforyoda.github.io/blog/ '
						target='_blank'
					>
						Blog
					</a>
					<br />
					{'• '}
					<a
						href='https://jinforyoda.github.io/react-redux-typescript-TODO/'
						target='_blank'
					>
						Todo
					</a>
					<br />
					{'• '}
					<a
						href='https://jinforyoda.github.io/currency_converter/'
						target='_blank'
					>
						Currency converter
					</a>
					<br />
					{'• '}
					<a
						href='https://jinforyoda.github.io/aigen_test/'
						target='_blank'
					>
						Documents searcher
					</a>
				</p>
			</section>
			<section
				className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
			>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => {
						if (id === 'introductionMe') return null
						return (
							<li className={utilStyles.listItem} key={id}>
								<Link href={`/posts/${id}`}>
									<a>{title}</a>
								</Link>
								<br />
								<small className={utilStyles.lightText}>
									<Date dateString={date} />
								</small>
							</li>
						)
					})}
				</ul>
			</section>
		</Layout>
	)
}
