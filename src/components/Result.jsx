export default function Result({ resultObj, clearResults, resultRef }) {
    return (
        <>
            {resultObj.data && (
                <div className="conversion-result" ref={resultRef}>
                    <div className="result-card">
                        <h3 className="result-title">Conversion Result</h3>
                        <div className="result-content">
                            <div className="result-amount">
                                <span className="from-amount">
                                    {resultObj.meta.amount} {resultObj.meta.base_currency}
                                </span>
                                <span className="equals">=</span>
                                <span className="to-amount">
                                    {resultObj.data.converted_amount} {resultObj.meta.target_currency}
                                </span>
                            </div>
                            <div className="result-rate">
                                Exchange Rate: 1 {resultObj.meta.base_currency} = {resultObj.data.conversion_rate} {resultObj.meta.target_currency}
                            </div>
                            <div className="result-updated">
                                Last updated: {new Date(resultObj.meta.last_updated_at).toLocaleString()}
                            </div>
                        </div>
                        <button 
                            type="button" 
                            className="clear-button"
                            onClick={clearResults}
                        >
                            Clear Result
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
