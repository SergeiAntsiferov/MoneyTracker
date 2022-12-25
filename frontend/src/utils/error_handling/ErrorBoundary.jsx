import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  async componentDidCatch(error, errorInfo) { // Логирование ошибки
    const { children } = this.props;
    const componentName = children.type.name;
    console.log(componentName, error);
  }

  render() { // Рендер запасного UI
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="main">
          <p className="main__title">Что-то пошло не так...</p>
          <p className="main__title">Обновите страницу, если ситуация повторяется - обратитесь в службу поддержки</p>
        </div>
      );
    } return children;
  }
}

export default ErrorBoundary;
