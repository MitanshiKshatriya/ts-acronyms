import React from 'react'

export default function Content({data,query}) {

	return (
		<div className="content-data">
			{data ? data.map((item,index)=>{
				return (
					<p key={index} className="data-item">
					<span>{item.acronym}</span>
					{" "}
					<span>{item.name}</span>
					</p>
					)
			})
			:
			<p>No Results Found</p>
		}
		</div>
	)
}