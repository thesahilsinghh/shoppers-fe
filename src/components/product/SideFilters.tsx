import React,{useEffect,useState} from 'react'

const SideFilters = ({categories, values, onChange, onReset }) => {
    const [localMin, setLocalMin] = useState(values.minPrice ?? '');
    const [localMax, setLocalMax] = useState(values.maxPrice ?? '');

    useEffect(() => {
        setLocalMin(values.minPrice ?? '');
        setLocalMax(values.maxPrice ?? '');
    }, [values.minPrice, values.maxPrice]);

    

    return (
        <div className="p-4">
            <h4 className="font-medium mb-3">Filters</h4>

            <div className="mb-4">
                <label className="block text-sm mb-1">Category</label>
                <div className="space-y-2">
                    {categories.map((cat:string) => (
                        
                        <label key={cat} className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="category"
                                className="radio radio-sm"
                                checked={values.category?.toUpperCase() === cat.toUpperCase()}
                                onChange={() => onChange({ ...values, category: cat })}
                            />
                            <span className="text-sm">{cat}</span>
                        </label>
                    ))}
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="category"
                            className="radio radio-sm"
                            checked={!values.category}
                            onChange={() => onChange({ ...values, category: undefined })}
                        />
                        <span className="text-sm">All</span>
                    </label>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm mb-1">Price range</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="input input-sm w-full"
                        value={localMin}
                        onChange={(e) => setLocalMin(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="input input-sm w-full"
                        value={localMax}
                        onChange={(e) => setLocalMax(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 mt-3">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onChange({ ...values, minPrice: localMin ? Number(localMin) : undefined, maxPrice: localMax ? Number(localMax) : undefined })}
                    >
                        Apply
                    </button>
                    <button
                        className="btn btn-sm"
                        onClick={() => {
                            setLocalMin('');
                            setLocalMax('');
                            onChange({ ...values, minPrice: undefined, maxPrice: undefined });
                        }}
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <button className="btn btn-ghost btn-sm" onClick={onReset}>
                    Reset all
                </button>
            </div>
        </div>
    );
}

export default SideFilters