const colors = {
  white: #FFFFFF,
  lightGray: #C4C4C4,
  darkGray: #707070,
  black: #000000,
  lighterGreen: #D1E7B1,
  lightGreen: #BBDC8E,
  green: #85BB3A,
  darkGreen: #597D26,
  pink: #F8E5EE,
  purple: #533E4C
};

const layout = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const text = StyleSheet.create({
  header: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: 1.25
  },
  body: {
    fontFamily: 'Inter',
    fontWeight: 300,
    fontSize: 16,
    lineHeight: 1.25
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { colors, layout, text, styles };
