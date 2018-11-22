/** 
 * 访问性检测
*/
import throttle from 'lodash.throttle';

const reducedMotionEnabled = throttle(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, 3000);

export default {
    reducedMotionEnabled
};