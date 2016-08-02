import Validator from './validator';
import debounce from './utils/debouncer.js';

const DEFAULT_DELAY = 0;

export default (Vue, options) => {
    Vue.mixin({
        data() {
            return {
                errors: []
            };
        },
        created() {
            this.$validator = Validator.create();
            this.$set('errors', this.$validator.errors);
        }
    });

    Vue.directive('validate', {
        params: ['rules', 'delay'],
        onInput() {
            this.vm.$validator.validate(this.fieldName, this.el.value);
        },
        onFileInput() {
            if (! this.vm.$validator.validate(this.fieldName, this.el.files)) {
                this.el.value = '';
            }
        },
        attachValidator() {
            this.vm.$validator.attach(this.fieldName, this.params.rules);
        },
        bind() {
            this.fieldName = this.el.name;
            this.attachValidator();
            const handler = this.el.type === 'file' ? this.onFileInput : this.onInput;
            this.handles = this.el.type === 'file' ? 'change' : 'input';

            const delay = this.params.delay || (options && options.delay) || DEFAULT_DELAY;
            this.handler = delay ? debounce(handler.bind(this), delay) : handler.bind(this);
            this.el.addEventListener(this.handles, this.handler);
        },
        unbind() {
            this.vm.$validator.detach(this.fieldName);
            this.el.removeEventListener(this.handles, this.handler);
        }
    });
};