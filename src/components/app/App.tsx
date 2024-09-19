import { CSSProperties, useState } from 'react';

import styles from './App.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Article } from '../article';

export const App = () => {
	const [style, setStyle] = useState(defaultArticleState);

	const addChanges = (options: ArticleStateType) => {
		setStyle({
			...style,
			fontFamilyOption: options.fontFamilyOption,
			fontSizeOption: options.fontSizeOption,
			fontColor: options.fontColor,
			contentWidth: options.contentWidth,
			backgroundColor: options.backgroundColor,
		});
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': style.fontFamilyOption.value,
					'--font-size': style.fontSizeOption.value,
					'--font-color': style.fontColor.value,
					'--container-width': style.contentWidth.value,
					'--bg-color': style.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={addChanges} />
			<Article />
		</main>
	);
};
