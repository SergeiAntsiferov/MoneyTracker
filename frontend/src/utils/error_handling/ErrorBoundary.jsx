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
        <div className="page main">
          <p className="page main__title">Something went wrong...</p>
        </div>
      );
    } return children;
  }
}

export default ErrorBoundary;
