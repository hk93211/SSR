import '../assets/styles/footer.less';

export default {
    data() {
        return {
            authod: 'HK'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>Writen by {this.authod}</span>
            </div>
        )
    }
}