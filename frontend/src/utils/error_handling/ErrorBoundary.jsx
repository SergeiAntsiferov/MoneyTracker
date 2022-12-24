import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      fetch_error: false // ошибка сети
    }
  }
  
  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }
  

  async componentDidCatch(error, errorInfo) { // Логирование ошибки
    const componentName = this.props.children.type.name
    console.log(componentName, error)
  }

  render() { // Рендер запасного UI
    if (this.state.hasError) {
      return (
          <div className="main">
            <p className="main__title">Что-то пошло не так...</p>
            <p className="main__title">Обновите страницу, если ситуация повторяется - обратитесь в службу поддержки</p>
          </div>
      )
    } else return this.props.children
  }
}
  
export default ErrorBoundary