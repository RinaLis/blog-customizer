import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useClose } from 'src/hooks/useClose';

export interface ArticleParamsFormProps {
	onSubmit: (options: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
	const [state, setState] = useState(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const setDefaultState = () => {
		setState(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	const submitForm = (evt: React.FormEvent<EventTarget>) => {
		evt.preventDefault();
		onSubmit(state);
	};
	useEffect(() => {
		console.log(isMenuOpen);
	});

	useClose({
		isOpen: isMenuOpen,
		rootRef: ref,
		onClose: () => setIsMenuOpen(false),
	});

	return (
		<React.Fragment>
			<ArrowButton
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
				isOpen={isMenuOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={ref}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Separator />
					<Select
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						title='Шрифт'
						onChange={(selected) => {
							setState({
								...state,
								fontFamilyOption: selected,
							});
						}}
					/>
					<Separator />
					<RadioGroup
						name='fontsize'
						selected={state.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selected) => {
							setState({
								...state,
								fontSizeOption: selected,
							});
						}}
					/>
					<Separator />
					<Select
						options={fontColors}
						selected={state.fontColor}
						title='Цвет шрифта'
						onChange={(selected) => {
							setState({
								...state,
								fontColor: selected,
							});
						}}
					/>
					<Separator />
					<Separator />
					<Select
						options={backgroundColors}
						selected={state.backgroundColor}
						title='Цвет фона'
						onChange={(selected) => {
							setState({
								...state,
								backgroundColor: selected,
							});
						}}
					/>
					<Separator />
					<Select
						options={contentWidthArr}
						selected={state.contentWidth}
						title='Ширина контента'
						onChange={(selected) => {
							setState({
								...state,
								contentWidth: selected,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={setDefaultState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</React.Fragment>
	);
};
